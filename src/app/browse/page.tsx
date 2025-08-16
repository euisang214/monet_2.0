import ListingCard from "@/components/ListingCard";
import { professionals } from "@/lib/mockData";

export default function Browse(){
  return (
    <div className="container-narrow py-10 space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Browse Professionals</h1>
          <p className="text-sm text-[var(--muted)]">Identity hidden until booking. Filter by employer, function, seniority, and price.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <input placeholder="Search employer or role…" className="w-64" />
          <select className="w-40"><option>All seniorities</option><option>Junior</option><option>Mid</option><option>Senior</option></select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {professionals.map(p => <ListingCard key={p.id} pro={p} />)}
      </div>
    </div>
  );
}
