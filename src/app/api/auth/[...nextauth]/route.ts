import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`, {
            email,
            password
          });

          if (response.data.success) {
            return {
              id: response.data.data.id,
              name: response.data.data.name,
              email: response.data.data.email,
              myToken: response.data.data.token,
              nickname: response.data.data.nickname,
            };
          } else {
            return null;
          }
        } catch (error: any) {
          console.error("Login error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.myToken = user.myToken;
          token.nickname = user.nickname;
        }
      }

      if (account?.provider === "google") {
        const expires_in = account.expires_at ?? 100;
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + expires_in * 1000;
        token.refreshToken = account.refresh_token;

        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${account.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: account.access_token,
              refresh_token: account.refresh_token
            }),
          });
        } catch (error) {
          console.error("Failed to notify backend about Google login", error);
        }

      }

      return token;
    },
    async session({ session, token }) {
      session.myToken = token.myToken as string;
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.nickname = token.nickname as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
