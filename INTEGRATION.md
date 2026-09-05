# Yam Jum Pen — Module ของ กันทรากร

Target repository: `https://github.com/tawanka251-glitch/yam-jum-pen`

## หน้าที่ของโมดูล
1. Login / Register / Logout และระบุตัวผู้ใช้
2. Role `OWNER` / `CARETAKER`
3. ระบบผู้รับฝากดูข้อมูลสัตว์เลี้ยงที่เปิดรับฝากก่อนตัดสินใจรับงาน
4. ห้องแชตระหว่างเจ้าของกับผู้รับฝาก
5. Authorization: อ่าน/ส่งข้อความได้เฉพาะสมาชิกของห้องแชต
6. Prisma + PostgreSQL แทน mock data

## ไฟล์ที่จะนำไปวาง
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/prisma.ts`
- `lib/auth.ts`
- `lib/password.ts`
- `src/components/AuthForm.tsx`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/app/api/auth/*`
- `src/app/api/caretaker/pets/route.ts`
- `src/app/api/conversations/*`
- `src/app/caretaker/pets/page.tsx`
- `src/app/caretaker/chat/page.tsx`
- `src/app/chat/[conversationId]/page.tsx`

## ติดตั้ง package
Run in repo:
```bash
npm install @prisma/client
npm install -D prisma tsx
```

## Environment
Create `.env`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?schema=public"
AUTH_SECRET="ใส่ค่า random ยาวๆ ที่เดาไม่ได้"
```

## Database
```bash
npx prisma generate
npx prisma migrate dev --name initial_app
npx tsx prisma/seed.ts
```

Demo accounts from seed:
- owner@example.com / 123456
- caretaker@example.com / 123456

## Run
```bash
npm run dev
```

## Routes
- `/login`
- `/register`
- `/caretaker/pets`
- `/caretaker/chat`
- `/chat/new?petId=demo-pet`
- `/chat/<conversationId>`

## สำคัญตอน merge
Repo เดิมมี mock implementation อยู่ที่ `lib/pets.ts`, `lib/chats.ts` และ API `/api/pets`, `/api/chat` ซึ่งควรหยุดใช้เมื่อเปลี่ยนมาใช้โมดูลนี้ เพื่อไม่ให้ข้อมูลคนละชุดกัน

หากเพื่อนสร้าง `prisma/schema.prisma` เพิ่มภายหลัง ห้ามมี datasource/generator ซ้ำ ให้รวม models ของ User/Pet/Conversation/Message เข้า schema เดียวแทน
