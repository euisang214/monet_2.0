import DashboardSidebar from "@/components/DashboardSidebar";

export default function CandidateReceipts(){
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="candidate" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Receipts</h1>
        <div className="card">
          <div className="font-medium">Itemized receipt</div>
          <div className="text-sm text-[var(--muted)]">Includes VAT/GST fields (USA launch footprint).</div>
          <div className="skeleton h-24 mt-3"></div>
        </div>
      </div>
    </div>
  );
}
