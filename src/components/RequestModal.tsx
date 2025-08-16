"use client";

import React from "react";
import Button from "@/components/ui/Button";

export default function RequestModal(){
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={()=>setOpen(true)}>Request 30‑min call</Button>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="card max-w-lg w-full relative">
            <button onClick={()=>setOpen(false)} className="absolute right-4 top-4 text-xl" aria-label="Close">×</button>
            <h3 className="text-lg font-semibold mb-2">Request expert call</h3>
            <p className="text-sm text-[var(--muted)] mb-4">We&apos;ll notify the professional. If accepted, you&apos;ll pick a time that works for both of you.</p>
            <div className="grid gap-3 mb-4">
              <label>
                <span className="block mb-1">What do you want to focus on?</span>
                <textarea rows={4} placeholder="e.g., technical prep on DCF & accretion/dilution; culture and role fit; mock interview" />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
              <Button>Send request</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
