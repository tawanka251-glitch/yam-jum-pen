'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

type Message = { id: string; content: string; createdAt: string; sender: { id: string; name: string; role: string } };

export default function ChatPage() {
  const params = useParams<{ conversationId: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const id = params.conversationId;

  useEffect(() => {
    if (id === 'new') {
      const petId = search.get('petId');
      if (!petId) return setError('ไม่พบรหัสสัตว์เลี้ยง');
      fetch('/api/conversations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ petId }) }).then(async r => { const d = await r.json(); if (!r.ok) throw new Error(d.error); router.replace(`/chat/${d.conversation.id}`); }).catch(e => setError(e.message));
      return;
    }
    fetch('/api/auth/me').then(r => r.json()).then(d => setUserId(d.user?.id || ''));
  }, [id, router, search]);

  async function load() { const r = await fetch(`/api/conversations/${id}/messages`); const d = await r.json(); if (r.ok) setMessages(d.messages || []); else setError(d.error); }
  useEffect(() => { if (id !== 'new') { load(); const t = setInterval(load, 2500); return () => clearInterval(t); } }, [id]);

  async function send(e: React.FormEvent) { e.preventDefault(); if (!text.trim()) return; const r = await fetch(`/api/conversations/${id}/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: text }) }); if (r.ok) { setText(''); load(); } else { const d = await r.json(); setError(d.error || 'ส่งข้อความไม่ได้'); } }

  return <main className="mx-auto max-w-2xl p-6"><h1 className="mb-4 text-2xl font-bold">แชตตกลงรายละเอียดรับฝาก</h1>{error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-600">{error}</div>}<div className="mb-4 h-[28rem] overflow-y-auto rounded-2xl border bg-gray-50 p-4">{messages.map(m => <div key={m.id} className={`mb-3 flex ${m.sender.id === userId ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[75%] rounded-2xl px-4 py-3 ${m.sender.id === userId ? 'bg-orange-500 text-white' : 'bg-white shadow-sm'}`}><div className="mb-1 text-xs opacity-70">{m.sender.name}</div><div>{m.content}</div></div></div>)}</div><form onSubmit={send} className="flex gap-2"><input value={text} onChange={e => setText(e.target.value)} className="flex-1 rounded-xl border p-3" placeholder="พิมพ์ข้อความ..."/><button className="rounded-xl bg-orange-500 px-5 text-white">ส่ง</button></form></main>;
}
