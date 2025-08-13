
# Booking & Funds State Machine

States:
- `REQUESTED` → created by candidate request (requires candidate profile ≥80% complete).
- `ACCEPTED` → professional accepts; scheduling UI opens.
- `ACCEPTED` + scheduled → create Zoom meeting + Google Calendar events for both parties.
- `COMPLETED_PENDING_FEEDBACK` → auto-set at call end time.
- `COMPLETED` → after pro submits feedback and QC passes.
- `REFUNDED` → automatic if feedback missing after 48h + 24h grace, or if cancellations require refund.

Funds:
- PaymentIntent confirmed on accept (pre-call). Platform holds full funds in platform balance (escrow).
- On QC pass → transfer net (gross − 20% platform fee) to pro's connected account; mark `Payment.RELEASED` and `Payout.PAID`.
- On required refunds (pro cancel; candidate cancel ≥3h full; <3h 50%) → process partial/ full refund against PaymentIntent.

Cancellations:
- Candidate cancel ≥3h before start → full refund.
- Candidate cancel <3h → 50% penalty (retain 50% to platform; **no pro payout** in MVP).
- Professional cancel → full refund; meeting invalidated; nudge to reschedule (no penalty in MVP).

Audit:
- Store all transitions with actor, timestamp, and reason in server logs.
