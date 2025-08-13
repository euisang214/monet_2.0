
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createEscrowPaymentIntent(params: {
  amountCents: number;
  currency?: string;
  customerEmail: string;
  bookingId: string;
}) {
  const currency = params.currency ?? 'usd';
  const pi = await stripe.paymentIntents.create({
    amount: params.amountCents,
    currency,
    receipt_email: params.customerEmail,
    description: `Monet booking ${params.bookingId}`,
    automatic_payment_methods: { enabled: true },
  });
  return pi;
}

export async function refundPaymentIntent(paymentIntentId: string, amountCents?: number) {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amountCents,
  });
}

export async function transferToPro(params: {
  paymentIntentId: string;
  proStripeAccountId: string;
  amountCents: number;
}) {
  // Separate charges and transfers model: transfer available balance to connected account.
  return stripe.transfers.create({
    amount: params.amountCents,
    currency: 'usd',
    destination: params.proStripeAccountId,
    description: `Payout for ${params.paymentIntentId}`,
  });
}
