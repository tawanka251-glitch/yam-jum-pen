import Link from 'next/link';
import { getAllPets } from '@/lib/pets';
import { PetMascot } from '@/components/PetMascot';

export default async function HomePage() {
	const pets = await getAllPets();

	return (
		<main className="mx-auto max-w-6xl px-6 py-12">
			<section className="relative mb-12 overflow-hidden rounded-blob bg-peach px-8 py-12 text-white md:px-14">
				<PetMascot className="absolute -right-6 -top-6 h-36 w-36 opacity-90 md:h-44 md:w-44" />

				<p className="font-kanit mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
					Pet care community
				</p>
				<h1 className="font-kanit max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">
					ฝากสัตว์เลี้ยงไว้กับคนที่เข้าใจ
				</h1>
				<p className="mt-4 max-w-xl text-lg text-white/90">
					ค้นหาผู้รับฝากที่เหมาะกับน้อง หรือสร้างประกาศเพื่อให้การดูแลต่อเนื่องและสบายใจขึ้น
				</p>
				<Link
					href="/pets/new"
					className="font-kanit mt-8 inline-block rounded-full bg-white px-6 py-3 font-bold text-peach shadow-md transition hover:scale-105"
				>
					เริ่มสร้างประกาศ
				</Link>
			</section>

			<div className="mb-6 flex items-end justify-between gap-4">
				<div>
					<p className="font-kanit text-sm font-semibold text-peach">AVAILABLE NOW</p>
					<h2 className="font-kanit mt-1 text-3xl font-bold text-ink">สัตว์เลี้ยงที่กำลังมองหาผู้ดูแล</h2>
				</div>
				<span className="text-sm text-ink/50">{pets.length} รายการ</span>
			</div>

			<section className="grid gap-5 md:grid-cols-2">
				{pets.map(pet => (
					<article
						key={pet.id}
						className="rounded-blob bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
					>
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-center gap-3">
								<PetMascot className="h-12 w-12 shrink-0" />
								<div>
									<h3 className="font-kanit text-2xl font-bold text-ink">{pet.name}</h3>
									<p className="mt-1 text-ink/60">{pet.type} · {pet.breed}</p>
								</div>
							</div>
							<span className="font-kanit shrink-0 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-ink">
								พร้อมรับฝาก
							</span>
						</div>
						<p className="mt-5 line-clamp-2 text-ink/70">{pet.behavior}</p>
						<div className="mt-5 flex items-center justify-between border-t border-blush pt-4 text-sm">
							<span className="text-ink/50">โดย {pet.owner.name}</span>
							<Link href={`/pets/${pet.id}`} className="font-kanit font-bold text-peach hover:underline">
								ดูรายละเอียด →
							</Link>
						</div>
					</article>
				))}
			</section>
		</main>
	);
}