export type Role = "candidate" | "professional";

export interface Professional {
  id: string;
  employer: string;
  title: string;
  seniority?: string;
  priceUSD: number;
  tags?: string[];
}

export interface Candidate {
  id: string;
  name: string;
  school?: string;
  resumeUrl?: string;
}

export interface Booking {
  id: string;
  candidateId: string;
  professionalId: string;
  status: "draft"|"requested"|"accepted"|"cancelled"|"completed"|"refunded";
  startAt?: string;
  endAt?: string;
  priceUSD: number;
}

export interface Feedback {
  bookingId: string;
  stars1: number;
  stars2: number;
  stars3: number;
  actions: string[];
  text: string;
  submittedAt?: string;
  qcStatus?: "passed" | "revise" | "failed";
}
