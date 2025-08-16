"use client";
import { useState } from "react";

export default function SignIn() {
  const [role, setRole] = useState<"candidate"|"professional">("candidate");
  return (
    <section className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Sign in to Monet</h1>
      <div className="card p-6 space-y-6">
        <div className="flex gap-3">
          <button onClick={() => setRole("candidate")} className={"btn-secondary " + (role==="candidate" ? "ring-2 ring-indigo-600" : "")}>Candidate</button>
          <button onClick={() => setRole("professional")} className={"btn-secondary " + (role==="professional" ? "ring-2 ring-indigo-600" : "")}>Professional</button>
        </div>
        <div className="grid gap-3">
          <button className="btn">Continue with LinkedIn</button>
          <button className="btn-secondary">Continue with Google</button>
        </div>
        <p className="text-sm text-muted">We’ll import your basic profile. You can manually add experience and education, and upload a resume (PDF).</p>
      </div>
    </section>
  );
}
