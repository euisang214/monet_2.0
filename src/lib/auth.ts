import { PrismaAdapter } from "@next-auth/prisma-adapter";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: { params: { scope: "r_liteprofile r_emailaddress" } },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.localizedFirstName ? `${profile.localizedFirstName} ${profile.localizedLastName ?? ""}`.trim() : null,
          email: profile.email ?? null,
          image: null,
        } as { id: string; name: string | null; email: string | null; image: string | null };
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { scope: process.env.GOOGLE_SCOPES },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
};
