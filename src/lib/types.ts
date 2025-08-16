export type Role = "candidate"|"professional"|"admin";

export type Professional = {
  id: string;
  employer: string;
  title: string;
  seniority?: string;
  priceUSD: number;
  tags?: string[];
  // anonymity: name & photo hidden until booking confirmed
  // we still keep them here for post-booking screens
  _name?: string;
  _photoUrl?: string;
};

export type Candidate = {
  id: string;
  name: string;
  education: string[];
  experience: string[];
};

export type BookingStep = "request"|"schedule"|"checkout"|"confirm";

export type AvailabilitySlot = {
  start: string; // ISO
  end: string;   // ISO
  status: "available"|"unavailable";
};
