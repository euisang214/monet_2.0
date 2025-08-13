This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Monet — MVP (Production-ready skeleton)

Monet is a two-sided marketplace matching aspiring finance/consulting candidates with industry professionals for paid 30‑minute expert calls.

This repo includes the core MVP scope: auth & onboarding, discovery, request/accept, scheduling via Google Calendar, Zoom meeting creation, Stripe Connect escrow & payouts, cancellations, anonymity, feedback & LLM QC, success-fee invoicing, and an admin surface.

**Tech**: Next.js (App Router) + TypeScript, Prisma + Postgres, NextAuth (LinkedIn + Google OAuth), Stripe Connect, Zoom server-to-server OAuth, Google Calendar API, background jobs (cron + queue-ready), Vitest for unit tests.

**Feature flags**
```
FEATURE_LINKEDIN_ENHANCED=false
FEATURE_SUCCESS_FEE=true
FEATURE_QC_LLM=true
```

## Quick start

1. **Install**  
   ```bash
   pnpm i
   ```

2. **Environment**  
   Copy `.env.example` → `.env.local` and fill values.

3. **Database**  
   ```bash
   npx prisma migrate dev --name init
   pnpm prisma db seed
   ```

4. **Dev server**  
   ```bash
   pnpm dev
   ```

5. **Tests**  
   ```bash
   pnpm test
   ```

## Key acceptance paths

- Sign up via LinkedIn lite (email + basic profile). Fallback: manual profile + resume PDF.
- Candidate browses professional *cards* (employer/title/seniority/price only). Name & photo hidden until booking is confirmed.
- Candidate requests → Pro accepts/declines.
- On accept: Pro sees candidate free/busy windows (Google Calendar merge) and picks a 30‑min slot → platform creates Zoom meeting + both calendar events.
- Candidate pays upfront (Stripe). Funds held in platform balance until feedback QC passes. Platform fee 20%.
- Cancellations: candidate <3h → 50% penalty; pro cancel → full refund.
- Feedback: 3 star categories + ≥200 words + 3 concrete actions. LLM QC gates payout. Auto-nudges at +24h, +48h; +24h grace, then auto-refund.
- Corporate email verification required before listing goes live.
- Success-fee invoice: candidate-initiated 10% of sign-on bonus; admin can override/void. (feature-flagged on)

See **/docs/STATE_MACHINE.md** and the Postman collection for API surfaces.
