import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const conversation = await prisma.conversation.findUnique({ where: { id }, select: { ownerId: true, caretakerId: true } });
  if (!conversation || ![conversation.ownerId, conversation.caretakerId].includes(user.id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const messages = await prisma.message.findMany({ where: { conversationId: id }, include: { sender: { select: { id: true, name: true, role: true } } }, orderBy: { createdAt: 'asc' } });
  return NextResponse.json({ messages });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    const { id } = await params;
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const conversation = await prisma.conversation.findUnique({ where: { id }, select: { ownerId: true, caretakerId: true } });
    if (!conversation || ![conversation.ownerId, conversation.caretakerId].includes(user.id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { content } = await request.json();
    if (!String(content || '').trim()) return NextResponse.json({ error: 'ข้อความห้ามว่าง' }, { status: 400 });
    const message = await prisma.message.create({ data: { conversationId: id, senderId: user.id, content: String(content).trim() }, include: { sender: { select: { id: true, name: true, role: true } } } });
    return NextResponse.json({ message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'ส่งข้อความไม่สำเร็จ' }, { status: 500 });
  }
}
