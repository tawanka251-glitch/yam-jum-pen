import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/password';

const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: { name: 'เจ้าของตัวอย่าง', email: 'owner@example.com', passwordHash: await hashPassword('123456'), role: 'OWNER' },
  });

  await prisma.user.upsert({
    where: { email: 'caretaker@example.com' },
    update: {},
    create: { name: 'ผู้รับฝากตัวอย่าง', email: 'caretaker@example.com', passwordHash: await hashPassword('123456'), role: 'CARETAKER' },
  });

  await prisma.pet.upsert({
    where: { id: 'demo-pet' },
    update: {},
    create: {
      id: 'demo-pet', name: 'ส้มจี๊ด', type: 'แมว', breed: 'สก็อตติช โฟลด์', age: '2 ปี',
      behavior: 'เข้ากับคนง่าย ชอบนอน', medicalNotes: 'แพ้อาหารที่มีส่วนผสมของไก่', ownerId: owner.id, status: 'AVAILABLE',
    },
  });
}

main().finally(() => prisma.$disconnect());
