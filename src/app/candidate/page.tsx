import Link from "next/link";
import { bookings, professionals } from "@/lib/mockData";
import { usd, dateTime } from "@/lib/format";

export default function CandidateDashboard() {
  const upcoming = bookings.filter(b => b.status === "accepted").slice(0, 5);
  return (
    <section className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Candidate Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-3">Upcoming calls</h2>
          <ul className="space-y-3">
            {upcoming.map(b => {
              const p = professionals.find(x => x.id === b.professionalId)!;
              return (
                <li key={b.id} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{p.employer} — {p.title}</div>
                    <div className="text-sm text-muted">{dateTime(b.startAt!)} · 30m</div>
                  </div>
                  <Link className="btn-secondary" href="#">Join</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-3">Quick browse</h2>
          <div className="grid gap-3">
            {professionals.slice(0,3).map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <div className="font-medium">{p.employer}</div>
                  <div className="text-sm text-muted">{p.title}</div>
                </div>
                <div className="text-sm">{usd(p.priceUSD)}</div>
              </div>
            ))}
          </div>
          <Link className="btn mt-4" href="/browse">Browse all</Link>
        </div>
      </div>
    </section>
  );
}
