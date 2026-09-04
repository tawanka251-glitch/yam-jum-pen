'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pet {
    id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    behavior: string;
    medicalNotes: string;
    ownerName: string;
}

export default function CaretakerPetsPage() {
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        fetch('/api/pets')
            .then((res) => res.json())
            .then((data) => setPets(data.pets || []));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">🐾 รายการสัตว์เลี้ยงที่เปิดรับฝาก (เช็คข้อมูลก่อนรับงาน)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pets.map((pet) => (
                    <div key={pet.id} className="border p-4 rounded-lg shadow-sm bg-white">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold text-orange-600">{pet.name} ({pet.type})</h2>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">เจ้าของ: {pet.ownerName}</span>
                        </div>
                        <p className="text-sm text-gray-600"><strong>สายพันธุ์:</strong> {pet.breed} | <strong>อายุ:</strong> {pet.age}</p>
                        <p className="text-sm mt-2"><strong>นิสัย:</strong> {pet.behavior}</p>
                        <p className="text-sm text-red-600 mt-1"><strong>ข้อควรระวัง:</strong> {pet.medicalNotes}</p>

                        <div className="mt-4 pt-3 border-t flex justify-between items-center">
                            <Link
                                href="/caretaker/chat"
                                className="bg-orange-500 text-white px-3 py-1.5 rounded text-sm hover:bg-orange-600"
                            >
                                💬 ทักแชตคุยกับเจ้าของ
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}