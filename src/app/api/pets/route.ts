import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    const pets = await prisma.pet.findMany({
        where: { status: 'AVAILABLE' },
        include: { owner: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ pets });
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อนสร้างประกาศ' }, { status: 401 });
        }

        const { name, type, breed, age, behavior, medicalNotes } = await request.json();
        if (!name?.trim() || !type?.trim() || !breed?.trim() || !age?.trim() || !behavior?.trim()) {
            return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
        }

        const pet = await prisma.pet.create({
            data: {
                name: name.trim(),
                type: type.trim(),
                breed: breed.trim(),
                age: age.trim(),
                behavior: behavior.trim(),
                medicalNotes: medicalNotes?.trim() || '',
                ownerId: user.id,
            },
        });

        return NextResponse.json({ pet }, { status: 201 });
    } catch (err) {
        console.error('CREATE PET ERROR:', err);
        return NextResponse.json({ error: 'ไม่สามารถสร้างประกาศได้' }, { status: 500 });
    }
}