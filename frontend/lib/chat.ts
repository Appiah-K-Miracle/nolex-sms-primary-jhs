type Conversation = { id: string; title: string; participants: string[] };
type Message = { id: string; conversationId: string; author: string; text: string; time: string };

const mockConversations: Conversation[] = [
  { id: 'c1', title: 'Class JHS 2 - Parents', participants: ['teacher','parent1'] },
  { id: 'c2', title: 'Math Subject Group', participants: ['teacher','colleague'] }
];

const mockMessages: Message[] = [
  { id: 'm1', conversationId: 'c1', author: 'Parent (Akua)', text: 'Good morning, teacher', time: '09:00' },
  { id: 'm2', conversationId: 'c1', author: 'Teacher', text: 'Good morning — how can I help?', time: '09:01' }
];

export function fetchConversations(): Promise<Conversation[]> {
  return Promise.resolve(mockConversations);
}

export function fetchMessages(conversationId: string): Promise<Message[]> {
  return Promise.resolve(mockMessages.filter(m => m.conversationId === conversationId));
}

export function sendMessage(conversationId: string, author: string, text: string): Promise<Message> {
  const m: Message = { id: `m${Date.now()}`, conversationId, author, text, time: new Date().toLocaleTimeString() };
  mockMessages.push(m);
  return Promise.resolve(m);
}

export type { Conversation, Message };
