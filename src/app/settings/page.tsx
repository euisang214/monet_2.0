export default function Settings() {
  return (
    <section className="container py-10 max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="card p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Profile</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="Full name" />
            <input className="input" placeholder="Email" />
            <input className="input" placeholder="Phone number" />
            <input className="input" placeholder="Timezone" />
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold">Calendar</h2>
          <div className="mt-3 flex items-center justify-between rounded-xl border p-4">
            <div>
              <div className="font-medium">Connect Calendar</div>
              <div className="text-sm text-muted">Connect your calendar to automatically block out busy times.</div>
            </div>
            <button className="btn-secondary">Connect</button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" /> Email notifications
          </label>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <input className="input md:col-span-2" placeholder="Card number" />
            <input className="input" placeholder="MM / YY" />
            <input className="input" placeholder="CVV" />
          </div>
          <button className="btn mt-4">Save Changes</button>
        </div>
      </div>
    </section>
  );
}
