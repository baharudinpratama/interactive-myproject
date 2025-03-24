import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // const expires_in = account.expires_at ?? 10;
        const expires_in = 10;

        token.accessToken = account.accessToken;
        token.accessTokenExpires = Date.now() + expires_in * 1000;
        token.refreshToken = account.refresh_token;

        return token;
      }

      if (token.accessTokenExpires && Date.now() > (token.accessTokenExpires as number)) {
        console.log("Access token expired, attempting to refresh...");

        if (typeof token.refreshToken !== "string") {
          throw new Error("Invalid refresh token type");
        }

        try {
          const response = await fetch("https://oauth2.googleapis.com/token?", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken!,
            }),
          });

          const refreshedTokens = await response.json();

          if (!response.ok) throw refreshedTokens;

          console.log("Successfully refreshed token:", refreshedTokens.access_token);

          return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
