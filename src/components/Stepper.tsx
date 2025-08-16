export default function Stepper({step}:{step: "request"|"schedule"|"checkout"|"confirm"}){
  const steps = [
    { id:"request", label:"Request" },
    { id:"schedule", label:"Schedule" },
    { id:"checkout", label:"Checkout" },
    { id:"confirm", label:"Confirm" },
  ];
  const idx = steps.findIndex(s => s.id===step);
  return (
    <div className="flex items-center gap-3 text-sm my-4">
      {steps.map((s,i)=>(
        <div key={s.id} className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${i<=idx? "bg-[var(--accent)] text-white border-[var(--accent)]":"border-[var(--border)]"}`}>{i+1}</div>
          <span className={i<=idx ? "font-semibold" : "text-[var(--muted)]"}>{s.label}</span>
          {i<steps.length-1 && <div className="w-10 h-px bg-[var(--border)]"></div>}
        </div>
      ))}
    </div>
  );
}
