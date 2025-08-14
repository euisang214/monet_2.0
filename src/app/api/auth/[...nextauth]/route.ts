
import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

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
      return { ...session, role: user.role };
    },
  },
});

export { handler as GET, handler as POST };
