"use client";

import React from "react";
import Link from "next/link";

export default function ChatSidebar({ conversations, onSelect, activeId }: { conversations: Array<{id:string; title:string; lastMessage:string}>; onSelect: (id:string)=>void; activeId?: string }) {
  return (
    <aside className="w-80 border-r bg-white">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Conversations</h3>
        <Link href="/teacher/communication/chat/new" className="text-xs text-blue-600">New Chat</Link>
      </div>
      <ul className="divide-y">
        {conversations.map(c => (
          <li key={c.id} className={`p-3 cursor-pointer ${activeId===c.id? 'bg-indigo-50':''}`} onClick={()=>onSelect(c.id)}>
            <div className="font-medium">{c.title}</div>
            <div className="text-xs text-gray-500 truncate">{c.lastMessage}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
