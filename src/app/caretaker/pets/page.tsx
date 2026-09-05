'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Pet = { id: string; name: string; type: string; breed: string; age: string; behavior: string; medicalNotes: string; owner: { id: string; name: string } };

export default function CaretakerPetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState('');

  useEffect(() => { fetch('/api/caretaker/pets').then(async r => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setPets(d.pets || []); }).catch(e => setError(e.message)); }, []);

  return <main className="mx-auto max-w-5xl p-6"><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-bold">สัตว์เลี้ยงที่เปิดรับฝาก</h1><Link href="/" className="text-orange-600 underline">หน้าแรก</Link></div>{error ? <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div> : <div className="grid gap-4 md:grid-cols-2">{pets.map(p => <article key={p.id} className="rounded-2xl border bg-white p-5 shadow-sm"><div className="mb-3 flex justify-between gap-3"><h2 className="text-xl font-semibold text-orange-600">{p.name} ({p.type})</h2><span className="text-sm text-gray-500">เจ้าของ: {p.owner.name}</span></div><p><b>สายพันธุ์:</b> {p.breed} &nbsp; <b>อายุ:</b> {p.age}</p><p className="mt-2"><b>นิสัย:</b> {p.behavior}</p><p className="mt-2 rounded-lg bg-red-50 p-3 text-red-700"><b>สุขภาพ/ข้อควรระวัง:</b> {p.medicalNotes || 'ไม่มีข้อมูล'}</p><Link href={`/chat/new?petId=${p.id}`} className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 text-white">ติดต่อเจ้าของ</Link></article>)}</div>}</main>;
}
