import Link from 'next/link';
import { getAllPets } from '@/lib/pets';

export default function HomePage() {
	const pets = getAllPets();

	return (
		<main className="mx-auto max-w-6xl px-6 py-12">
			<section className="mb-12 rounded-3xl bg-orange-500 px-8 py-12 text-white md:px-14">
				<p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">Pet care community</p>
				<h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">ฝากสัตว์เลี้ยงไว้กับคนที่เข้าใจ</h1>
				<p className="mt-4 max-w-xl text-lg text-orange-50">ค้นหาผู้รับฝากที่เหมาะกับน้อง หรือสร้างประกาศเพื่อให้การดูแลต่อเนื่องและสบายใจขึ้น</p>
				<Link href="/pets/new" className="mt-8 inline-block rounded-full bg-white px-5 py-3 font-semibold text-orange-600 hover:bg-orange-50">เริ่มสร้างประกาศ</Link>
			</section>

			<div className="mb-6 flex items-end justify-between gap-4">
				<div><p className="text-sm font-semibold text-orange-600">AVAILABLE NOW</p><h2 className="mt-1 text-3xl font-bold">สัตว์เลี้ยงที่กำลังมองหาผู้ดูแล</h2></div>
				<span className="text-sm text-slate-500">{pets.length} รายการ</span>
			</div>
			<section className="grid gap-5 md:grid-cols-2">
				{pets.map(pet => (
					<article key={pet.id} className="border border-orange-100 bg-white p-6 shadow-sm">
						<div className="flex items-start justify-between gap-4">
							<div><h3 className="text-2xl font-bold text-slate-900">{pet.name}</h3><p className="mt-1 text-slate-500">{pet.type} · {pet.breed}</p></div>
							<span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">พร้อมรับฝาก</span>
						</div>
						<p className="mt-5 line-clamp-2 text-slate-600">{pet.behavior}</p>
						<div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
							<span className="text-slate-500">โดย {pet.ownerName}</span>
							<Link href={`/pets/${pet.id}`} className="font-semibold text-orange-600 hover:underline">ดูรายละเอียด →</Link>
						</div>
					</article>
				))}
			</section>
		</main>
	);
}
