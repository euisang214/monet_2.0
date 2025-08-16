export default function Pricing(){
  return (
    <div className="container-narrow py-10 space-y-6">
      <h1 className="text-2xl font-bold">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-lg font-semibold">Call pricing</div>
          <p className="text-sm text-[var(--muted)] mt-2">Set by each professional. Recommended default $40.</p>
        </div>
        <div className="card">
          <div className="text-lg font-semibold">Platform fee</div>
          <p className="text-sm text-[var(--muted)] mt-2">20% on each call. Payout via Stripe Connect (USA only).</p>
        </div>
        <div className="card">
          <div className="text-lg font-semibold">Success fee</div>
          <p className="text-sm text-[var(--muted)] mt-2">Optional 10% of sign‑on bonus invoice after you land the role.</p>
        </div>
      </div>
    </div>
  );
}
