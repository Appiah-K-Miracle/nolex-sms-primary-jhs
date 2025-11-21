"use client";

import { useState } from 'react';
import Link from 'next/link';
import LineChart from "../../../../../components/charts/line-chart";
import ChatSidebar from "../../../../../components/chat/chat-sidebar";
import ConversationWindow from "../../../../../components/chat/conversation-window";

interface Params { params: { id: string } }

function fetchSubject(id: string) {
  return {
    id,
    name: id === 'math' ? 'Mathematics' : 'English',
    outline: 'Course outline and syllabus goes here.',
    materials: [{ id: 1, title: 'Chapter 1 Notes' }],
    assignments: [{ id: 1, title: 'Algebra Worksheet', due: '2025-12-01' }]
  };
}

export default function SubjectDetails({ params }: Params) {
  const subject = fetchSubject(params.id);

  // Mock chat data
  const [conversations] = useState([{ id: 'c1', title: 'Class 3A - Q&A', lastMessage: 'Please check chapter 1' }, { id: 'c2', title: 'Math Teachers', lastMessage: 'Meeting at 3pm' }]);
  const [activeConv, setActiveConv] = useState<string | undefined>(conversations[0].id);
  const [messages, setMessages] = useState<Record<string, Array<{id:string; author:string; text:string; time?:string}>>>(()=>({ c1:[{id:'m1',author:'Grace',text:'Don\'t forget the worksheet',time:'09:00'}], c2:[{id:'m2',author:'Admin',text:'Staff meeting',time:'08:30'}] }));

  function sendMessage(text: string){
    if(!activeConv) return;
    const msg = { id: String(Date.now()), author: 'You', text, time: new Date().toLocaleTimeString() };
    setMessages(prev => ({ ...prev, [activeConv]: [...(prev[activeConv] || []), msg] }));
  }

  const perfData = [65, 70, 68, 72, 75, 78];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{subject.name}</h1>
          <p className="text-sm text-gray-600">{subject.outline}</p>
        </div>
        <Link href="/teacher/academics/subjects" className="px-3 py-2 bg-gray-100 rounded">Back to Subjects</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Uploaded Materials</h3>
          <ul className="space-y-2 text-sm">
            {subject.materials.map(m => (
              <li key={m.id} className="p-2 border rounded">{m.title}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-6 mb-3">Assignments</h3>
          <ul className="space-y-2 text-sm">
            {subject.assignments.map(a => (
              <li key={a.id} className="p-2 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-gray-500">Due: {a.due}</div>
                </div>
                <Link href="/teacher/academics/assignments" className="text-sm text-blue-600">View</Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Class Chat</h3>
            <div className="h-72 border rounded overflow-hidden flex">
              <ChatSidebar conversations={conversations} onSelect={(id)=>setActiveConv(id)} activeId={activeConv} />
              <ConversationWindow conversationId={activeConv} messages={messages[activeConv || ''] || []} onSend={sendMessage} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Performance Summary</h3>
          <div className="w-full h-40"><LineChart data={perfData} /></div>
        </div>
      </div>
    </div>
  );
}
