export default function SignIn(){
  return (
    <div className="container-narrow py-16 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <div className="grid gap-3">
        <button className="btn btn-primary w-full">Continue with LinkedIn</button>
        <button className="btn btn-outline w-full">Continue with Google</button>
        <div className="text-xs text-[var(--muted)]">LinkedIn lite profile + email only at launch.</div>
      </div>
      <div className="mt-8 card">
        <div className="font-medium mb-2">Manual profile (fallback)</div>
        <label className="block mb-3">
          <span className="block mb-1">Experience</span>
          <textarea rows={4} placeholder="Companies, roles, dates…" />
        </label>
        <label className="block mb-3">
          <span className="block mb-1">Education</span>
          <textarea rows={3} placeholder="Schools, degrees…" />
        </label>
        <label className="block mb-4">
          <span className="block mb-1">Upload resume (PDF)</span>
          <input type="file" accept="application/pdf" />
        </label>
        <button className="btn btn-primary">Save profile</button>
      </div>
    </div>
  );
}
