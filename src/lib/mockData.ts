import type { Professional, Candidate, AvailabilitySlot } from "./types";

export const professionals: Professional[] = [
  { id:"pro_1", employer:"Centerview Partners", title:"Associate", seniority:"Mid", priceUSD:40, tags:["IB","M&A"] },
  { id:"pro_2", employer:"Goldman Sachs", title:"Analyst", seniority:"Junior", priceUSD:40, tags:["Markets"] },
  { id:"pro_3", employer:"PJT Partners", title:"Vice President", seniority:"Senior", priceUSD:85, tags:["Restructuring"] },
  { id:"pro_4", employer:"Morgan Stanley", title:"Associate", seniority:"Mid", priceUSD:60, tags:["IB"] },
  { id:"pro_5", employer:"Qatalyst Partners", title:"Director", seniority:"Senior", priceUSD:120, tags:["Tech M&A"] },
];

export const candidates: Candidate[] = [
  { id:"cand_1", name:"Hidden", education:["B.S. Economics — State University"], experience:["Summer Analyst — Regional Bank Corp."] },
  { id:"cand_2", name:"Hidden", education:["MBA — Top School"], experience:["Equity Research Intern — Buy-side"] },
];

export const demoAvailability: AvailabilitySlot[] = [
  // A handful of sample free/busy windows over a week
  { start:"2025-10-01T13:00:00.000Z", end:"2025-10-01T13:30:00.000Z", status:"available" },
  { start:"2025-10-01T18:00:00.000Z", end:"2025-10-01T18:30:00.000Z", status:"available" },
  { start:"2025-10-02T14:00:00.000Z", end:"2025-10-02T14:30:00.000Z", status:"available" },
  { start:"2025-10-03T16:00:00.000Z", end:"2025-10-03T16:30:00.000Z", status:"available" },
];
