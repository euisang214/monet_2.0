import DashboardSidebar from "@/components/DashboardSidebar";

export default function CandidatePayments(){
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="candidate" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="card">
          <div className="font-medium">Referral / Success fee pledge</div>
          <div className="text-sm text-[var(--muted)]">Optional: 10% of sign‑on bonus to the professional who helped you.</div>
          <div className="mt-3 grid md:grid-cols-3 gap-3">
            <input placeholder="$ Amount" defaultValue="500" />
            <button className="btn btn-primary">Save pledge</button>
          </div>
        </div>
        <table className="table card">
          <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>2024‑07‑15</td><td>Expert call with Centerview</td><td>$50</td><td>Completed</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
