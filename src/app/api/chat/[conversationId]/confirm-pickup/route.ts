import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(
    req: Request,
    { params }: { params: { conversationId: string } }
) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบ' }, { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
        where: { id: params.conversationId },
        include: { pet: true },
    });
    if (!conversation) {
        return NextResponse.json({ error: 'ไม่พบการสนทนานี้' }, { status: 404 });
    }

    if (conversation.pet.status !== 'ACCEPTED') {
        return NextResponse.json(
            { error: 'ยังไม่อยู่ในสถานะที่คืนสัตว์ได้' },
            { status: 400 }
        );
    }

    const isOwner = conversation.ownerId === user.id;
    const isCaretaker = conversation.caretakerId === user.id;
    if (!isOwner && !isCaretaker) {
        return NextResponse.json({ error: 'ไม่มีสิทธิ์ทำรายการนี้' }, { status: 403 });
    }

    const data = isOwner
        ? { ownerConfirmedReturn: true }
        : { caretakerConfirmedReturn: true };

    const updated = await prisma.conversation.update({
        where: { id: params.conversationId },
        data,
    });

    if (updated.ownerConfirmedReturn && updated.caretakerConfirmedReturn) {
        await prisma.pet.update({
            where: { id: conversation.petId },
            data: { status: 'COMPLETED' },
        });
    }

    return NextResponse.json({ conversation: updated });
}