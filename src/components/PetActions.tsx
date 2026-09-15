'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function PetActions({
    petId,
    isOwner,
    isLoggedIn,
}: {
    petId: string;
    isOwner: boolean;
    isLoggedIn: boolean;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function startChat() {
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ petId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาด');
            router.push(`/chat/${data.conversation.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
        } finally {
            setLoading(false);
        }
    }

    async function deletePet() {
        if (!confirm('ยืนยันลบประกาศนี้?')) return;
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`/api/pets/${petId}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาด');
            router.push('/');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
        } finally {
            setLoading(false);
        }
    }

    if (isOwner) {
        return (
            <div>
                {error && <p className="mb-3 rounded-3xl bg-red-50 p-3 text-sm text-red-500">{error}</p>}
                <div className="flex gap-3">
                    <Link
                        href={`/pets/${petId}/edit`}
                        className="font-kanit rounded-full bg-peach px-6 py-3 font-bold text-white shadow-md transition hover:scale-105"
                    >
                        แก้ไขประกาศ
                    </Link>
                    <button
                        onClick={deletePet}
                        disabled={loading}
                        className="font-kanit rounded-full bg-red-100 px-6 py-3 font-bold text-red-600 disabled:opacity-50"
                    >
                        {loading ? 'กำลังลบ...' : 'ลบประกาศ'}
                    </button>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <Link
                href="/login"
                className="font-kanit inline-block rounded-full bg-peach px-6 py-3 font-bold text-white shadow-md transition hover:scale-105"
            >
                เข้าสู่ระบบเพื่อติดต่อผู้ฝาก
            </Link>
        );
    }

    return (
        <div>
            {error && <p className="mb-3 rounded-3xl bg-red-50 p-3 text-sm text-red-500">{error}</p>}
            <button
                onClick={startChat}
                disabled={loading}
                className="font-kanit rounded-full bg-peach px-6 py-3 font-bold text-white shadow-md transition hover:scale-105 disabled:opacity-50"
            >
                {loading ? 'กำลังเริ่ม...' : 'เริ่มคุย'}
            </button>
        </div>
    );
}