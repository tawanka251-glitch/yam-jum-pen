import { prisma } from './prisma';

export async function getAllPets() {
    return prisma.pet.findMany({
        where: { status: 'AVAILABLE' },
        include: { owner: true },
        orderBy: { createdAt: 'desc' },
    });
}

export async function getPetById(id: string) {
    return prisma.pet.findUnique({
        where: { id },
        include: { owner: true },
    });
}

export async function createPet(data: {
    name: string;
    type: string;
    breed: string;
    age: string;
    behavior: string;
    medicalNotes: string;
    ownerId: string;
}) {
    return prisma.pet.create({ data });
}