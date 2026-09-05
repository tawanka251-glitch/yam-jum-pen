export interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    createdAt: string;
}

const mockMessages: ChatMessage[] = [
    {
        id: '1',
        sender: 'คุณกันทรากร (ผู้ฝาก)',
        message: 'สวัสดีครับ สนใจรับฝากน้องส้มจี๊ดไหมครับ?',
        createdAt: new Date().toISOString()
    }
];

export function getMessages(): ChatMessage[] {
    return mockMessages;
}

export function addMessage(sender: string, message: string): ChatMessage {
    const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender,
        message,
        createdAt: new Date().toISOString()
    };
    mockMessages.push(newMessage);
    return newMessage;
}