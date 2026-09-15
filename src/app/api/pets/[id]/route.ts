import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const pet = await prisma.pet.findUnique({
        where: { id: params.id },
        include: { owner: { select: { id: true, name: true } } },
    });
    if (!pet) {
        return NextResponse.json({ error: 'ไม่พบประกาศนี้' }, { status: 404 });
    }
    return NextResponse.json({ pet });
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบ' }, { status: 401 });
    }

    const pet = await prisma.pet.findUnique({ where: { id: params.id } });
    if (!pet) {
        return NextResponse.json({ error: 'ไม่พบประกาศนี้' }, { status: 404 });
    }
    if (pet.ownerId !== user.id) {
        return NextResponse.json({ error: 'แก้ไขได้เฉพาะประกาศของตัวเอง' }, { status: 403 });
    }

    const { name, type, breed, age, behavior, medicalNotes } = await req.json();

    const updated = await prisma.pet.update({
        where: { id: params.id },
        data: {
            ...(name?.trim() && { name: name.trim() }),
            ...(type?.trim() && { type: type.trim() }),
            ...(breed?.trim() && { breed: breed.trim() }),
            ...(age?.trim() && { age: age.trim() }),
            ...(behavior?.trim() && { behavior: behavior.trim() }),
            ...(medicalNotes !== undefined && { medicalNotes: medicalNotes.trim() }),
        },
    });

    return NextResponse.json({ pet: updated });
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบ' }, { status: 401 });
    }

    const pet = await prisma.pet.findUnique({ where: { id: params.id } });
    if (!pet) {
        return NextResponse.json({ error: 'ไม่พบประกาศนี้' }, { status: 404 });
    }
    if (pet.ownerId !== user.id) {
        return NextResponse.json({ error: 'ลบได้เฉพาะประกาศของตัวเอง' }, { status: 403 });
    }
    if (pet.status !== 'AVAILABLE') {
        return NextResponse.json(
            { error: 'ลบไม่ได้เพราะมีการรับฝากอยู่ระหว่างดำเนินการ' },
            { status: 400 }
        );
    }

    await prisma.pet.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
}