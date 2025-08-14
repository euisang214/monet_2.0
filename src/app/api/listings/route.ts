
// GET /api/listings
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employer = searchParams.get('employer') ?? undefined;
  const seniority = searchParams.get('seniority') ?? undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

  const pros = await prisma.professionalProfile.findMany({
    where: {
      ...(employer ? { employer: { contains: employer, mode: 'insensitive' } } : {}),
      ...(seniority ? { seniority: { contains: seniority, mode: 'insensitive' } } : {}),
      ...(maxPrice ? { priceUSD: { lte: maxPrice } } : {}),
      user: { corporateEmailVerified: true },
    },
    select: {
      userId: true,
      employer: true,
      title: true,
      seniority: true,
      priceUSD: true,
      tags: true,
    },
  });

  // Enforce anonymity pre-booking: no name/image
  return NextResponse.json({ items: pros });
}
