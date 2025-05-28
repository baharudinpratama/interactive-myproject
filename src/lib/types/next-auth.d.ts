import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    myToken?: string;
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      nickname?: string;
    }
  }

  interface User {
    id: string;
    name: string;
    email: string;
    myToken?: string;
    nickname?: string;
  }

  interface JWT {
    myToken?: string;
    accessToken?: string;
  }
}
