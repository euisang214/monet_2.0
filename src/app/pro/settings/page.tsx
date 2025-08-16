import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProSettings(){
  return (
    <div className="container-narrow py-8 flex gap-8">
      <DashboardSidebar role="professional" />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="card space-y-4">
          <div>
            <div className="font-medium mb-2">Corporate email verification</div>
            <div className="grid md:grid-cols-[1fr_auto] gap-2">
              <input placeholder="you@employer.com" />
              <button className="btn btn-primary">Send verify link</button>
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">Required to be listed publicly.</p>
          </div>
          <div>
            <div className="font-medium mb-2">Calendar</div>
            <button className="btn btn-outline">Connect Google Calendar</button>
          </div>
          <div>
            <div className="font-medium mb-2">Stripe payouts</div>
            <button className="btn btn-outline">Connect Stripe (USA only)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
