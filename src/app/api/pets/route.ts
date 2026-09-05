import { NextResponse } from 'next/server';
import { getAllPets } from '@/lib/pets';

export async function GET() {
    const pets = getAllPets();
    return NextResponse.json({ pets });
}