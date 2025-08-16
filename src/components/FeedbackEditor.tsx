"use client";
import { useMemo, useState } from "react";

const MIN_WORDS = 200;

export default function FeedbackEditor({ onSubmit }: { onSubmit: (payload: any) => void }) {
  const [stars1, setStars1] = useState(0);
  const [stars2, setStars2] = useState(0);
  const [stars3, setStars3] = useState(0);
  const [text, setText] = useState("");
  const [actions, setActions] = useState<string[]>([]);

  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);

  const valid = stars1>0 && stars2>0 && stars3>0 && words>=MIN_WORDS && actions.length===3;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <StarField label="Cultural Fit" value={stars1} onChange={setStars1} />
        <StarField label="Interest in Industry and Role" value={stars2} onChange={setStars2} />
        <StarField label="Technical Knowledge" value={stars3} onChange={setStars3} />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Detailed Feedback</label>
        <textarea className="input min-h-40" placeholder="Provide actionable, specific feedback (≥ 200 words)."
          value={text} onChange={(e) => setText(e.target.value)} />
        <div className={"text-sm " + (words<MIN_WORDS ? "text-red-600" : "text-muted")}>
          {words} / {MIN_WORDS} words
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-medium">3 concrete action items</label>
        <div className="grid gap-2">
          {[0,1,2].map(i => (
            <input key={i} className="input" placeholder={`Action item ${i+1}`}
              value={actions[i] || ""}
              onChange={(e) => {
                const next = actions.slice();
                next[i] = e.target.value;
                // Ensure deduped, 3 filled entries
                const compact = next.filter(Boolean).slice(0,3);
                setActions(compact.concat(Array(3-compact.length).fill("")));
              }} />
          ))}
        </div>
      </div>

      {!valid && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">
          Ensure all three star categories are rated, at least 200 words of feedback, and exactly three action items.
        </div>
      )}

      <div className="flex justify-end">
        <button disabled={!valid} className={"btn " + (!valid ? "opacity-60 cursor-not-allowed": "")}
          onClick={() => onSubmit({ stars1, stars2, stars3, text, actions })}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

function StarField({ label, value, onChange }: { label: string, value: number, onChange: (n:number)=>void }) {
  return (
    <div className="card p-4">
      <div className="mb-2 font-medium">{label}</div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i+1)}
            className={(i < value ? "text-yellow-500" : "text-gray-300") + " text-2xl leading-none"}>
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
