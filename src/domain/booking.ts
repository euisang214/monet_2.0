
/**
 * Booking & cancellation business rules
 */
export type CancellationOutcome = {
  refundToCandidateCents: number;
  retainPlatformCents: number;
  proPayoutCents: number;
  reason: string;
};

export function computeCancellationPolicy(args: {
  who: 'candidate' | 'professional';
  startAt: Date;
  now: Date;
  priceCents: number;
}): CancellationOutcome {
  const { who, startAt, now, priceCents } = args;
  const hoursDiff = (startAt.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (who === 'professional') {
    return {
      refundToCandidateCents: priceCents,
      retainPlatformCents: 0,
      proPayoutCents: 0,
      reason: 'Professional cancellation → full refund to candidate',
    };
  }

  // candidate cancellation
  if (hoursDiff >= 3) {
    return {
      refundToCandidateCents: priceCents,
      retainPlatformCents: 0,
      proPayoutCents: 0,
      reason: 'Candidate cancellation ≥3h → full refund',
    };
  } else {
    return {
      refundToCandidateCents: Math.floor(priceCents * 0.5),
      retainPlatformCents: Math.ceil(priceCents * 0.5),
      proPayoutCents: 0, // MVP: pro not paid on cancel
      reason: 'Candidate cancellation <3h → 50% penalty',
    };
  }
}

export function priceToPayout(priceCents: number) {
  const platformFee = Math.round(priceCents * 0.20);
  const net = priceCents - platformFee;
  return { platformFee, net };
}
