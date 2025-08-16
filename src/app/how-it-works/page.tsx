export default function HowItWorks(){
  return (
    <div className="container-narrow py-10 space-y-6">
      <h1 className="text-2xl font-bold">How it works</h1>
      <ol className="list-decimal pl-5 space-y-2 text-sm">
        <li>Authenticate with LinkedIn (lite scope) and connect Google Calendar.</li>
        <li>Browse professionals by employer; request a 30‑minute call.</li>
        <li>If accepted, you choose a time from overlapping Google Calendar windows.</li>
        <li>Pay upfront; funds are held in escrow. The call runs on Zoom.</li>
        <li>Professional submits quality feedback within 48 hours; payout is released.</li>
        <li>Optional: submit a 10% success fee on sign‑on bonus via invoice.</li>
      </ol>
    </div>
  );
}
