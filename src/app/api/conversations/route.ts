import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'CARETAKER') return NextResponse.json({ error: 'ต้องเข้าสู่ระบบเป็นผู้รับฝาก' }, { status: 401 });
    const { petId } = await request.json();
    const pet = await prisma.pet.findUnique({ where: { id: petId }, select: { id: true, ownerId: true, status: true } });
    if (!pet) return NextResponse.json({ error: 'ไม่พบสัตว์เลี้ยง' }, { status: 404 });
    const conversation = await prisma.conversation.upsert({ where: { petId_ownerId_caretakerId: { petId: pet.id, ownerId: pet.ownerId, caretakerId: user.id } }, update: {}, create: { petId: pet.id, ownerId: pet.ownerId, caretakerId: user.id } });
    return NextResponse.json({ conversation }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'สร้างห้องแชตไม่สำเร็จ' }, { status: 500 });
  }
}
