
import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: { params: { scope: "r_liteprofile r_emailaddress" } }, // lite profile + email
      profile(profile) {
        return {
          id: profile.id,
          name: profile.localizedFirstName ? `${profile.localizedFirstName} ${profile.localizedLastName ?? ""}`.trim() : null,
          email: profile.email ?? null,
          image: null, // keep photo hidden pre-booking (store null by default)
        } as any;
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
      // Attach role for RBAC
      (session as any).role = user.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
