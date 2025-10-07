import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { schemaSignIn } from "./schema";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Validation Form Data
        const validatedCredentials = schemaSignIn.safeParse(credentials);
        if (!validatedCredentials.success) throw new Error("Invalid Form Data");

        // Get data from database & validation user data
        const { email, password } = validatedCredentials.data;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
            image: true,
          },
        });
        if (!user || user.password) throw new Error("Invalid user account");

        // Validation password from database
        const verifyPassword = bcrypt.compare(password, user.password ?? "");
        if (!verifyPassword) throw new Error("Invalid password");

        // Return data from database
        return {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
          role: user.role ?? "customer",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role ?? "customer";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }

      return session;
    },
  },
});
