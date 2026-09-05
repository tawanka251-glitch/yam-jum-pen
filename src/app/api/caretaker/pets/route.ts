import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CARETAKER') return NextResponse.json({ error: 'ต้องเข้าสู่ระบบในฐานะผู้รับฝาก' }, { status: 401 });
  const pets = await prisma.pet.findMany({ where: { status: 'AVAILABLE' }, include: { owner: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ pets });
}
