import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/chats';

export async function GET() {
    const messages = getMessages();
    return NextResponse.json({ messages });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.message || body.message.trim() === '') {
            return NextResponse.json({ error: 'ข้อความห้ามเป็นค่าว่าง' }, { status: 400 });
        }
        const saved = addMessage(body.sender || 'ผู้รับฝาก (ตะวัน)', body.message);
        return NextResponse.json({ ok: true, item: saved }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการส่งข้อความ' }, { status: 500 });
    }
}