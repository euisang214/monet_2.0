"use client";
import { Professional } from "@/types";
import { usd } from "@/lib/format";
import { useState } from "react";
import RequestModal from "./RequestModal";

export default function ProfessionalCard({ pro }: { pro: Professional }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted">Employer</div>
          <div className="text-lg font-semibold">{pro.employer}</div>
        </div>
        <span className="badge">{usd(pro.priceUSD)} / 30m</span>
      </div>
      <div className="text-sm">
        <div className="text-muted">Title</div>
        <div>{pro.title}{pro.seniority ? ` · ${pro.seniority}` : ""}</div>
      </div>
      <div className="flex flex-wrap gap-2">{(pro.tags ?? []).map(t => <span key={t} className="badge">{t}</span>)}</div>
      <p className="text-sm text-muted">Identity hidden until booking is confirmed.</p>
      <div className="flex gap-3">
        <button className="btn" onClick={() => setOpen(true)}>Request 30‑min call</button>
        <button className="btn-secondary">View details</button>
      </div>
      {open && <RequestModal pro={pro} onClose={() => setOpen(false)} />}
    </div>
  );
}
