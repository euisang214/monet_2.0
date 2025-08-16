import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { usd } from "@/lib/utils";
import type { Professional } from "@/lib/types";
import Link from "next/link";

export default function ListingCard({pro}:{pro:Professional}){
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-[var(--muted)]">Employer</div>
          <div className="text-base font-semibold">{pro.employer}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-[var(--muted)]">Price</div>
          <div className="text-lg font-bold">{usd(pro.priceUSD)}</div>
        </div>
      </div>
      <div className="text-sm">
        <div className="text-[var(--muted)]">Role</div>
        <div>{pro.title}{pro.seniority ? ` — ${pro.seniority}`: ""}</div>
      </div>
      {pro.tags?.length ? (
        <div className="flex flex-wrap gap-2">{pro.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
      ): null}
      <div className="flex items-center justify-end">
        <Link href={`/booking/${pro.id}/schedule`} className="btn btn-primary">Request 30‑min call</Link>
      </div>
      <p className="text-xs text-[var(--muted)]">
        Identity hidden until booking is confirmed.
      </p>
    </Card>
  );
}
