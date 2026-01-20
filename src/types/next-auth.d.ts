import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      role_id: number;
      role_name: string;
    };
  }

  interface User {
    role_id: number;
    role_name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role_id: number;
    role_name: string;
  }
}
