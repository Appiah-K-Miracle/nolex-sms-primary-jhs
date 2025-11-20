"use client";

import { useEffect, useState } from "react";
import ChatSidebar from "../../../../components/chat/chat-sidebar";
import ConversationWindow from "../../../../components/chat/conversation-window";
import { fetchConversations, fetchMessages, sendMessage } from "../../../../lib/chat";

export default function ChatPage(){
  const [conversations, setConversations] = useState<any[]>([]);
  const [active, setActive] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(()=>{ fetchConversations().then(setConversations); }, []);

  useEffect(()=>{
    if(!active) return setMessages([]);
    fetchMessages(active).then(setMessages);
  }, [active]);

  async function onSend(text: string){
    if(!active) return;
    const m = await sendMessage(active, 'Teacher', text);
    setMessages(prev => [...prev, m]);
    setConversations(prev => prev.map(c => c.id === active ? { ...c, lastMessage: m.text } : c));
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      <ChatSidebar conversations={conversations.map(c=>({ id:c.id, title:c.title, lastMessage: (c as any).lastMessage || '' }))} onSelect={setActive} activeId={active} />
      <div className="flex-1 flex flex-col">
        <ConversationWindow conversationId={active} messages={messages.map(m=>({ id:m.id, author:m.author, text:m.text, time:m.time }))} onSend={onSend} />
      </div>
    </div>
  );
}
