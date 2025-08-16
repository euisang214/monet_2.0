import Link from "next/link";

export default function ProDashboard() {
  return (
    <section className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Professional Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-3">Upcoming calls</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Fri · 10:00 AM</span><Link href="#" className="btn-secondary">Join</Link></li>
            <li className="flex justify-between"><span>Sat · 11:30 AM</span><Link href="#" className="btn-secondary">Join</Link></li>
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-3">Recent earnings</h2>
          <div className="text-3xl font-bold">$2,500</div>
          <div className="text-sm text-muted">This month $350 · Pending payouts $120</div>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-3">Action items</h2>
          <ul className="text-sm list-disc ml-5 space-y-2">
            <li>2 feedback forms due</li>
            <li>Connect Google Calendar</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
