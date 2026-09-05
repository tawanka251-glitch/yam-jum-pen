'use client';

import Link from 'next/link';

export default function CaretakerChatEntryPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-3 text-2xl font-bold">ระบบแชต</h1>
      <p className="mb-6 text-gray-600">เลือกสัตว์เลี้ยงจากหน้ารายการเพื่อเริ่มสนทนากับเจ้าของ</p>
      <Link href="/caretaker/pets" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-white">ไปยังรายการสัตว์เลี้ยง</Link>
    </main>
  );
}
