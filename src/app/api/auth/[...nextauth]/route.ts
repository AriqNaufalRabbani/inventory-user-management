import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan password wajib diisi");
        }

        const [users]: any = await pool.query(`
          SELECT u.id, u.name, u.email, u.password, u.role_id, r.name as role_name
          FROM users u
          INNER JOIN roles r ON u.role_id = r.id
          WHERE u.email = ?
        `, [credentials.email]);

        if (users.length === 0) {
          throw new Error("Email belum terdaftar");
        }

        const user = users[0];
        // console.log(user)
        // console.log(credentials.password)
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Password salah");
        }

        return {
          id: user.id.toString(), // WAJIB string
          name: user.name,
          email: user.email,
          role_id: user.role_id,
          role_name: user.role_name,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.role_id = (user as any).role_id;
        token.role_name = (user as any).role_name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.role_id = token.role_id as number;
      session.user.role_name = token.role_name as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
