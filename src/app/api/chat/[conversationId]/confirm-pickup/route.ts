import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ conversationId: string }> }
) {
    const { conversationId } = await params;

    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบ' }, { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { pet: true },
    });
    if (!conversation) {
        return NextResponse.json({ error: 'ไม่พบการสนทนานี้' }, { status: 404 });
    }

    const isOwner = conversation.ownerId === user.id;
    const isCaretaker = conversation.caretakerId === user.id;
    if (!isOwner && !isCaretaker) {
        return NextResponse.json({ error: 'ไม่มีสิทธิ์ทำรายการนี้' }, { status: 403 });
    }

    const data = isOwner
        ? { ownerConfirmedPickup: true }
        : { caretakerConfirmedPickup: true };

    const updated = await prisma.conversation.update({
        where: { id: conversationId },
        data,
    });

    if (updated.ownerConfirmedPickup && updated.caretakerConfirmedPickup) {
        await prisma.pet.update({
            where: { id: conversation.petId },
            data: { status: 'ACCEPTED' },
        });
    }

    return NextResponse.json({ conversation: updated });
}