import DashboardSidebar from "@/components/DashboardSidebar";

export default function CandidateDashboard(){
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="candidate" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Candidate — Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="font-semibold mb-2">Upcoming calls</div>
            <div className="skeleton h-24"></div>
          </div>
          <div className="card">
            <div className="font-semibold mb-2">Recent feedback</div>
            <div className="skeleton h-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
