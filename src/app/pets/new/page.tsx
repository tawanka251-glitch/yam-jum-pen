'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function NewPetPage() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm font-semibold text-orange-600 hover:underline">← กลับหน้าแรก</Link>
      <div className="mt-6 border border-orange-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-orange-600">สร้างประกาศ</p>
        <h1 className="mt-2 text-3xl font-bold">บอกเราเกี่ยวกับสัตว์เลี้ยงของคุณ</h1>
        <p className="mt-2 text-slate-500">ข้อมูลเหล่านี้ช่วยให้ผู้รับฝากเข้าใจและดูแลน้องได้ดียิ่งขึ้น</p>
        {submitted ? <div className="mt-8 rounded-xl bg-green-50 p-5 text-green-800">บันทึกข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับเพื่อยืนยันรายละเอียด</div> : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block"><span className="mb-2 block text-sm font-semibold">ชื่อสัตว์เลี้ยง</span><input required name="name" className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-orange-500" /></label>
            <div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-sm font-semibold">ประเภท</span><select name="type" className="w-full rounded-lg border border-slate-200 p-3"><option>แมว</option><option>สุนัข</option><option>อื่น ๆ</option></select></label><label className="block"><span className="mb-2 block text-sm font-semibold">อายุ</span><input required name="age" placeholder="เช่น 2 ปี" className="w-full rounded-lg border border-slate-200 p-3" /></label></div>
            <label className="block"><span className="mb-2 block text-sm font-semibold">สายพันธุ์</span><input required name="breed" className="w-full rounded-lg border border-slate-200 p-3" /></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold">นิสัยและการดูแล</span><textarea required name="behavior" rows={4} className="w-full rounded-lg border border-slate-200 p-3" /></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold">สุขภาพ / ข้อควรระวัง</span><textarea name="medicalNotes" rows={3} className="w-full rounded-lg border border-slate-200 p-3" /></label>
            <button type="submit" className="w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600">ส่งข้อมูลประกาศ</button>
          </form>
        )}
      </div>
    </main>
  );
}