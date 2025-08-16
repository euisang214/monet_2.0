"use client";
import FeedbackEditor from "@/components/FeedbackEditor";

export default function FeedbackEditorPage({ params }: { params: { bookingId: string } }) {
  return (
    <section className="container py-10 space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold">Submit Feedback</h1>
      <FeedbackEditor onSubmit={(payload) => {
        alert("Feedback submitted!\n\n" + JSON.stringify(payload, null, 2));
      }} />
    </section>
  );
}
