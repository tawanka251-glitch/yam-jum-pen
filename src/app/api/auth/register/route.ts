import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import { setSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, role = 'OWNER' } = await request.json();
    if (!name?.trim() || !email?.trim() || !password || password.length < 6) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบ และรหัสผ่านต้องมีอย่างน้อย 6 ตัว' }, { status: 400 });
    }
    if (!['OWNER', 'CARETAKER'].includes(role)) return NextResponse.json({ error: 'บทบาทไม่ถูกต้อง' }, { status: 400 });
    const normalizedEmail = email.trim().toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (exists) return NextResponse.json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' }, { status: 409 });
    const user = await prisma.user.create({ data: { name: name.trim(), email: normalizedEmail, passwordHash: await hashPassword(password), role } });
    await setSession(user.id);
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'ไม่สามารถสมัครสมาชิกได้' }, { status: 500 });
  }
}
