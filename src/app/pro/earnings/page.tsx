import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProEarnings(){
  const rows = Array.from({length:5}).map(()=>({date:"July 15, 2024", desc:"Expert Call with Liam Carter", amt:"+$50", status:"Completed"}));
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="professional" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Earnings</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card"><div className="text-sm text-[var(--muted)]">Total Earnings</div><div className="text-2xl font-bold">$12,500</div></div>
          <div className="card"><div className="text-sm text-[var(--muted)]">Current Month</div><div className="text-2xl font-bold">$2,350</div></div>
          <div className="card"><div className="text-sm text-[var(--muted)]">Pending Payouts</div><div className="text-2xl font-bold">$500</div></div>
        </div>
        <div className="card overflow-x-auto">
          <div className="font-semibold mb-2">Transaction History</div>
          <table className="table min-w-[680px]">
            <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td className="text-[var(--muted)]">{r.date}</td>
                  <td className="text-[var(--muted)]">{r.desc}</td>
                  <td className="text-[var(--muted)]">{r.amt}</td>
                  <td><span className="badge">Completed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
