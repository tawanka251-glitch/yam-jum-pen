'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function NewPetPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const body = {
      name: formData.get('name'),
      type: formData.get('type'),
      breed: formData.get('breed'),
      age: formData.get('age'),
      behavior: formData.get('behavior'),
      medicalNotes: formData.get('medicalNotes'),
    };

    try {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาด');
      setSubmitted(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm font-semibold text-peach hover:underline">← กลับหน้าแรก</Link>
      <div className="mt-6 rounded-blob bg-white p-8 shadow-md">
        <p className="font-kanit text-sm font-semibold text-peach">สร้างประกาศ</p>
        <h1 className="font-kanit mt-2 text-3xl font-bold text-ink">บอกเราเกี่ยวกับสัตว์เลี้ยงของคุณ</h1>
        <p className="mt-2 text-ink/60">ข้อมูลเหล่านี้ช่วยให้ผู้รับฝากเข้าใจและดูแลน้องได้ดียิ่งขึ้น</p>

        {submitted ? (
          <div className="mt-8 rounded-3xl bg-mint p-5 text-ink">
            บันทึกข้อมูลเรียบร้อยแล้ว ประกาศของคุณแสดงในหน้าแรกแล้ว
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">ชื่อสัตว์เลี้ยง</span>
              <input required name="name" className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none" />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">ประเภท</span>
                <select name="type" className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none">
                  <option>แมว</option>
                  <option>สุนัข</option>
                  <option>อื่น ๆ</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">อายุ</span>
                <input required name="age" placeholder="เช่น 2 ปี" className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none" />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">สายพันธุ์</span>
              <input required name="breed" className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">นิสัยและการดูแล</span>
              <textarea required name="behavior" rows={4} className="w-full rounded-3xl border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">สุขภาพ / ข้อควรระวัง</span>
              <textarea name="medicalNotes" rows={3} className="w-full rounded-3xl border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none" />
            </label>
            {error && <p className="rounded-3xl bg-red-50 p-3 text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="font-kanit w-full rounded-full bg-peach px-5 py-3 font-bold text-white shadow-md transition hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? 'กำลังส่ง...' : 'ส่งข้อมูลประกาศ'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}