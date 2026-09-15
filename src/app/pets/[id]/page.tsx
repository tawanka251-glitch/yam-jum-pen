import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPetById } from '@/lib/pets';
import { getCurrentUser } from '@/lib/auth';
import { PetActions } from '@/components/PetActions';

export default async function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pet = await getPetById(id);
  if (!pet) notFound();

  const user = await getCurrentUser();
  const isOwner = user?.id === pet.ownerId;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="font-kanit text-sm font-semibold text-peach hover:underline">
        ← กลับหน้าแรก
      </Link>
      <article className="mt-6 rounded-blob bg-white p-8 shadow-md md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-blush pb-6">
          <div>
            <p className="font-kanit text-sm font-semibold text-peach">รายละเอียดสัตว์เลี้ยง</p>
            <h1 className="font-kanit mt-2 text-4xl font-bold text-ink">{pet.name}</h1>
            <p className="mt-2 text-ink/60">{pet.type} · {pet.breed} · อายุ {pet.age}</p>
          </div>
          <span className="font-kanit rounded-full bg-mint px-3 py-1 text-sm font-semibold text-ink">
            {pet.status === 'AVAILABLE' ? 'พร้อมรับฝาก' : pet.status}
          </span>
        </div>

        <dl className="grid gap-6 py-7 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-ink/50">นิสัยและการดูแล</dt>
            <dd className="mt-2 leading-7 text-ink">{pet.behavior}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink/50">สุขภาพและข้อควรระวัง</dt>
            <dd className="mt-2 leading-7 text-ink">{pet.medicalNotes || 'ไม่มีข้อมูล'}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink/50">ผู้ฝาก</dt>
            <dd className="mt-2 text-ink">{pet.owner.name}</dd>
          </div>
        </dl>

        <PetActions petId={pet.id} isOwner={isOwner} isLoggedIn={!!user} />
      </article>
    </main>
  );
}