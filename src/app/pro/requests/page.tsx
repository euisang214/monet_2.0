import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProRequests(){
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="professional" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Requests</h1>
        <div className="card overflow-x-auto">
          <table className="table min-w-[640px]">
            <thead><tr><th>Candidate</th><th>Profile Summary</th><th className="w-40">Actions</th></tr></thead>
            <tbody>
              <tr>
                <td>Liam Carter</td>
                <td className="text-[var(--muted)]">Experienced financial analyst with a background in investment banking.</td>
                <td className="text-[var(--muted)]">View | Accept | Decline</td>
              </tr>
              <tr>
                <td>Emily Chen</td>
                <td className="text-[var(--muted)]">MBA candidate focused on tech M&A; prior VC internship.</td>
                <td className="text-[var(--muted)]">View | Accept | Decline</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
