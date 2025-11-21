"use client";

import React from "react";

export default function RemarksSuggestions({ score }: { score: number }){
  function suggestions(s:number){
    if(s>=90) return ['Keep up the excellent work','Consider mentorship roles'];
    if(s>=75) return ['Good performance','Encourage participation in advanced tasks'];
    if(s>=60) return ['Satisfactory; focus on weak topics','Recommend revision sessions'];
    if(s>=50) return ['Needs improvement; set targets','Suggest remedial classes'];
    return ['Poor performance; immediate intervention needed','Arrange parent-teacher meeting'];
  }

  const items = suggestions(score);

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-600">Suggested remarks</div>
      <ul className="list-disc pl-5 text-sm">
        {items.map((t,i)=>(<li key={i}>{t}</li>))}
      </ul>
    </div>
  );
}
