'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PetMascot } from './PetMascot';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'OWNER' | 'CARETAKER'>('OWNER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' ? { email, password } : { name, email, password, role };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาด');
      router.push(role === 'CARETAKER' || data.user?.role === 'CARETAKER' ? '/caretaker/pets' : '/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-md space-y-4 rounded-blob bg-white p-8 shadow-lg"
    >
      <PetMascot className="mx-auto mb-2 h-16 w-16" />

      {mode === 'register' && (
        <input
          className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink placeholder:text-ink/40 focus:border-peach focus:outline-none"
          placeholder="ชื่อ-นามสกุล"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      )}
      <input
        className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink placeholder:text-ink/40 focus:border-peach focus:outline-none"
        type="email"
        placeholder="อีเมล"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink placeholder:text-ink/40 focus:border-peach focus:outline-none"
        type="password"
        placeholder="รหัสผ่านอย่างน้อย 6 ตัว"
        value={password}
        onChange={e => setPassword(e.target.value)}
        minLength={6}
        required
      />
      {mode === 'register' && (
        <select
          className="w-full rounded-full border-2 border-blush bg-cream p-3 px-5 text-ink focus:border-peach focus:outline-none"
          value={role}
          onChange={e => setRole(e.target.value as 'OWNER' | 'CARETAKER')}
        >
          <option value="OWNER">เจ้าของสัตว์เลี้ยง</option>
          <option value="CARETAKER">ผู้รับฝาก</option>
        </select>
      )}
      {error && (
        <p className="rounded-3xl bg-red-50 p-3 text-sm text-red-500">{error}</p>
      )}
      <button
        disabled={loading}
        className="w-full rounded-full bg-peach p-3 font-kanit font-bold text-white shadow-md transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? 'กำลังดำเนินการ...' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
      </button>
    </form>
  );
}