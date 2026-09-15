'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Pet = {
    id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    behavior: string;
    medicalNotes: string;
};

export function EditPetForm({ pet }: { pet: Pet }) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name'),
            type: formData.get('type'),
            breed: formData.get('breed'),
            age: formData.get('age'),
            behavior: formData.get('behavior'),
            medicalNotes: formData.get('medicalNotes'),
        };

        try {
            const res = await fetch(`/api/pets/${pet.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาด');
            router.push(`/pets/${pet.id}`);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">ชื่อสัตว์เลี้ยง</span>
                <input
                    required
                    name="name"
                    defaultValue={pet.name}
                    className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none"
                />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink">ประเภท</span>
                    <select
                        name="type"
                        defaultValue={pet.type}
                        className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none"
                    >
                        <option>แมว</option>
                        <option>สุนัข</option>
                        <option>อื่น ๆ</option>
                    </select>
                </label>
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink">อายุ</span>
                    <input
                        required
                        name="age"
                        defaultValue={pet.age}
                        className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none"
                    />
                </label>
            </div>
            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">สายพันธุ์</span>
                <input
                    required
                    name="breed"
                    defaultValue={pet.breed}
                    className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none"
                />
            </label>
            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">นิสัยและการดูแล</span>
                <textarea
                    required
                    name="behavior"
                    rows={4}
                    defaultValue={pet.behavior}
                    className="w-full rounded-3xl border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none"
                />
            </label>
            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">สุขภาพ / ข้อควรระวัง</span>
                <textarea
                    name="medicalNotes"
                    rows={3}
                    defaultValue={pet.medicalNotes}
                    className="w-full rounded-3xl border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none"
                />
            </label>
            {error && <p className="rounded-3xl bg-red-50 p-3 text-sm text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="font-kanit w-full rounded-full bg-peach px-5 py-3 font-bold text-white shadow-md transition hover:scale-[1.02] disabled:opacity-50"
            >
                {loading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
            </button>
        </form>
    );
}