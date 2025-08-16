"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import Stars from "@/components/ui/Stars";
import React from "react";
import Button from "@/components/ui/Button";

export default function ProFeedback(){
  const [cultural, setCultural] = React.useState(0);
  const [interest, setInterest] = React.useState(0);
  const [technical, setTechnical] = React.useState(0);
  const [text, setText] = React.useState("");
  const [actions, setActions] = React.useState<string[]>(["","",""]);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const meetsMin = wordCount >= 200 && actions.every(a => a.trim().length>0) && cultural && interest && technical;

  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="professional" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Submit Feedback</h1>
        <div className="card space-y-5">
          <div>
            <div className="font-semibold mb-1">Candidate Performance</div>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center justify-between"><span>Cultural Fit</span><Stars value={cultural} onChange={setCultural} /></label>
              <label className="flex items-center justify-between"><span>Interest in Industry & Role</span><Stars value={interest} onChange={setInterest} /></label>
              <label className="flex items-center justify-between"><span>Technical Knowledge</span><Stars value={technical} onChange={setTechnical} /></label>
            </div>
          </div>
          <div>
            <label className="block mb-2">Detailed Feedback <span className="text-[var(--muted)]">(≥ 200 words)</span></label>
            <textarea rows={10} value={text} onChange={e=>setText(e.target.value)} placeholder="Write clear, concrete, role-appropriate feedback…" />
            <div className={`mt-1 text-xs ${wordCount<200?"text-red-600":"text-green-600"}`}>Word count: {wordCount}</div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {[0,1,2].map(i=>(
              <label key={i} className="block">
                <span className="block mb-1">Action item {i+1}</span>
                <input value={actions[i]} onChange={e=>{
                  const next=[...actions]; next[i]=e.target.value; setActions(next);
                }} placeholder="e.g., Drill DCF steps out loud" />
              </label>
            ))}
          </div>
          <div className="rounded-lg p-3 text-sm bg-[var(--surface)] border border-[var(--border)]">
            <div className="font-medium mb-1">QC Checks</div>
            <ul className="list-disc pl-5 space-y-1">
              <li className={wordCount>=200 ? "text-green-700" : "text-red-700"}>≥ 200 words</li>
              <li className={(cultural&&interest&&technical) ? "text-green-700":"text-red-700"}>3 star categories populated</li>
              <li className={actions.every(a=>a.trim().length>0) ? "text-green-700":"text-red-700"}>3 distinct action items</li>
              <li className="text-[var(--muted)]">Clarity & tone checks run by server-side LLM before payout.</li>
            </ul>
          </div>
          <div className="flex justify-end">
            <Button disabled={!meetsMin} title={!meetsMin?"Complete all requirements first":undefined}>Submit Feedback</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
