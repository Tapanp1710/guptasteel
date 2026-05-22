import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validation";

// Mock users for development (no database required)
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@omniasteel.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    id: "2",
    name: "Karthik Y",
    email: "karthik@omniasteel.com",
    password: "sales123",
    role: "SALES_EXECUTIVE",
  },
  {
    id: "3",
    name: "Adil Raaz",
    email: "adil@omniasteel.com",
    password: "dispatch123",
    role: "DISPATCH_MANAGER",
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        // Check against mock users
        const user = MOCK_USERS.find((u) => u.email === parsed.data.email);

        if (!user) {
          return null;
        }

        // Plain string comparison (no bcrypt in mock mode)
        if (user.password !== parsed.data.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as { role?: string }).role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};