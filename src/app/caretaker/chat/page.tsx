'use client';

import { useState, useEffect } from 'react';

interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    createdAt: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');

    const fetchMessages = async () => {
        const res = await fetch('/api/chat');
        const data = await res.json();
        setMessages(data.messages || []);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: 'ผู้รับฝาก (ตะวัน)', message: input }),
        });

        setInput('');
        fetchMessages();
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">💬 ระบบแชตตกลงรายละเอียดรับฝาก</h1>

            <div className="border rounded-lg p-4 h-80 overflow-y-auto mb-4 bg-gray-50 space-y-3">
                {messages.map((msg) => (
                    <div key={msg.id} className={`p-3 rounded-lg max-w-xs ${msg.sender.includes('ตะวัน') ? 'bg-orange-100 ml-auto' : 'bg-white border'}`}>
                        <p className="text-xs text-gray-500 font-bold mb-1">{msg.sender}</p>
                        <p className="text-sm">{msg.message}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="พิมพ์ข้อความที่นี่..."
                    className="flex-1 border p-2 rounded"
                />
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    ส่ง
                </button>
            </form>
        </div>
    );
}