"use client";

import React from "react";
import type { AvailabilitySlot } from "@/lib/types";

type Props = {
  slots: AvailabilitySlot[];
  onPick: (iso: string) => void;
};

function fmt(iso:string){
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle:"medium", timeStyle:"short" });
}

export default function AvailabilityGrid({ slots, onPick }: Props){
  const [selected, setSelected] = React.useState<string|undefined>();
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {slots.map((s,i)=>(
          <button
            key={i}
            onClick={()=>{ setSelected(s.start); onPick(s.start); }}
            className={`card text-left ${selected===s.start ? "ring-2 ring-[var(--accent)]" : ""}`}
          >
            <div className="text-sm text-[var(--muted)]">30‑min slot</div>
            <div className="font-medium">{fmt(s.start)}</div>
          </button>
        ))}
      </div>
      {!slots.length && <div className="text-sm text-[var(--muted)]">No overlapping windows detected. Adjust your calendar windows or propose alternates.</div>}
    </div>
  );
}
