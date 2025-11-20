"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ConversationWindow({ conversationId, messages, onSend } : { conversationId?: string; messages: Array<{id:string; author:string; text:string; time?:string}>; onSend: (text:string)=>void }){
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function submit(e?: React.FormEvent){
    e?.preventDefault();
    if(!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b">
        <h4 className="font-semibold">{conversationId ? `Conversation: ${conversationId}` : 'Select a conversation'}</h4>
      </div>
      <div className="p-4 overflow-auto flex-1">
        {messages.map(m => (
          <div key={m.id} className="mb-3">
            <div className="text-sm font-medium">{m.author} <span className="text-xs text-gray-400">{m.time}</span></div>
            <div className="mt-1 bg-gray-100 inline-block px-3 py-2 rounded">{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="p-4 border-t flex items-center gap-3">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" className="flex-1 border rounded px-3 py-2" />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>
    </div>
  );
}
