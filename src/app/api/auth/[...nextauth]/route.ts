import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/google-auth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                address: "",
              }),
            }
          );
          const data = await res.json();
          if (data?.data?.accessToken && data?.data?.user) {
            token.role = data.data.user.role;
            token.accessToken = data.data.accessToken;
            token.backendUserId = data.data.user._id;
          }
        } catch {
          // Fail closed: no role assigned if backend is unreachable
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.backendUserId = token.backendUserId;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
