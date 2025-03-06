import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken to the Session type
  }

  interface JWT {
    accessToken?: string; // Add accessToken to the JWT type
  }
}
