import { notFound, redirect } from 'next/navigation';
import { getPetById } from '@/lib/pets';
import { getCurrentUser } from '@/lib/auth';
import { EditPetForm } from '@/components/EditPetForm';

export default async function EditPetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pet = await getPetById(id);
    if (!pet) notFound();

    const user = await getCurrentUser();
    if (!user) redirect('/login');
    if (user.id !== pet.ownerId) redirect(`/pets/${id}`);

    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <div className="rounded-blob bg-white p-8 shadow-md">
                <p className="font-kanit text-sm font-semibold text-peach">แก้ไขประกาศ</p>
                <h1 className="font-kanit mt-2 text-3xl font-bold text-ink">{pet.name}</h1>
                <EditPetForm pet={pet} />
            </div>
        </main>
    );
}