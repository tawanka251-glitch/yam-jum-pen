import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPets } from '@/lib/pets';

export function generateStaticParams() {
  return getAllPets().map(pet => ({ id: pet.id }));
}

export default async function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pet = getAllPets().find(item => item.id === id);
  if (!pet) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="text-sm font-semibold text-orange-600 hover:underline">← กลับหน้าแรก</Link>
      <article className="mt-6 border border-orange-100 bg-white p-8 shadow-sm md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div><p className="text-sm font-semibold text-orange-600">รายละเอียดสัตว์เลี้ยง</p><h1 className="mt-2 text-4xl font-bold">{pet.name}</h1><p className="mt-2 text-slate-500">{pet.type} · {pet.breed} · อายุ {pet.age}</p></div>
          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">พร้อมรับฝาก</span>
        </div>
        <dl className="grid gap-6 py-7 sm:grid-cols-2">
          <div><dt className="text-sm text-slate-500">นิสัยและการดูแล</dt><dd className="mt-2 leading-7">{pet.behavior}</dd></div>
          <div><dt className="text-sm text-slate-500">สุขภาพและข้อควรระวัง</dt><dd className="mt-2 leading-7">{pet.medicalNotes || 'ไม่มีข้อมูล'}</dd></div>
          <div><dt className="text-sm text-slate-500">ผู้ฝาก</dt><dd className="mt-2">{pet.ownerName}</dd></div>
        </dl>
        <Link href={`/chat/new?petId=${pet.id}`} className="inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">ติดต่อผู้ฝาก</Link>
      </article>
    </main>
  );
}