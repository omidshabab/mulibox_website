import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { resend } from "../email";
import VerifyEmail from "emails/verify";
import { authRoutes, dashRoutes } from "@/config/routes";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  callbackUrl: "/cards";
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  pages: {
    error: authRoutes.error,
    signIn: dashRoutes.default,
    signOut: authRoutes.default,
  },
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const payload = {
          email: identifier,
          url,
        };

        const result = await resend.emails.send({
          from: "MuliBox <onboarding@resend.dev>",
          to: [payload.email],
          subject: "Confirm Your Email to Access Your Leitner Box Account",
          react: VerifyEmail({ url: payload.url }),
        });

        if (result.error) {
          console.log(`ERROR::NextAuth-EmailProvider: ${result.error}`);

          throw new Error(`${result.error}`);
        }
      },
    }),
  ],
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect(authRoutes.default);
};
