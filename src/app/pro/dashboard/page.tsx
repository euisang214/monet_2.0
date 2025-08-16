import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProDashboard(){
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="professional" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Professional — Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card"><div className="text-sm text-[var(--muted)]">Total earnings</div><div className="text-2xl font-bold">$12,500</div></div>
          <div className="card"><div className="text-sm text-[var(--muted)]">Current month</div><div className="text-2xl font-bold">$2,350</div></div>
          <div className="card"><div className="text-sm text-[var(--muted)]">Pending payouts</div><div className="text-2xl font-bold">$500</div></div>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">Upcoming calls</div>
          <div className="skeleton h-24"></div>
        </div>
      </div>
    </div>
  );
}
