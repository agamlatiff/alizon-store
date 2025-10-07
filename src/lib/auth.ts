import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { schemaSignIn } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        
        const validatedCredentials = schemaSignIn.safeParse(credentials);
        
        const user = await prisma.user.findFirst({
          where: { email: validatedCredentials.data?.email, password: validatedCredentials.data?.password },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }
        
        return user
      },
    }),
  ],
});
