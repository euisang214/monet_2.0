import DashboardSidebar from "@/components/DashboardSidebar";

export default function CandidateRequests(){
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="candidate" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Requests</h1>
        <table className="table card">
          <thead><tr><th>Professional (employer)</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>Centerview Partners — Associate</td><td>Requested</td><td className="text-[var(--muted)]">Cancel</td></tr>
            <tr><td>Goldman Sachs — Analyst</td><td>Accepted</td><td className="text-[var(--muted)]">Schedule</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
