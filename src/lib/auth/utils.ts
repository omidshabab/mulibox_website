import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { resend } from "../email";
import VerifyEmail from "emails/verify";
import { authRoutes } from "@/config/routes";
import { SectionType } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: authRoutes.default,
    error: authRoutes.error,
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
          from: "mulibox. <hey@mulibox.com>",
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
  events: {
    async signIn(data) {
      /* on successful sign in */
    },
    async signOut(data) {
      /* on signout */
    },
    async createUser({ ...data }) {
      /* user created */
      const collection = await db.collection.create({
        data: {
          userId: data.user.id,
          name: "my collection",
        },
      });

      // Create a default box for the user
      const box = await db.box.create({
        data: {
          userId: data.user.id,
        },
      });

      // // Define the sections and their respective parts
      // const sectionsData = [
      //   { type: "one", partCount: 1 },
      //   { type: "two", partCount: 2 },
      //   { type: "three", partCount: 4 },
      //   { type: "four", partCount: 8 },
      //   { type: "five", partCount: 15 },
      // ];

      // // Create sections and parts
      // for (const sectionData of sectionsData) {
      //   const section = await db.section.create({
      //     data: {
      //       boxId: box.id,
      //       type: sectionData.type as SectionType,
      //     },
      //   });

      //   const partsData = Array.from({ length: sectionData.partCount }).map(
      //     () => ({
      //       sectionId: section.id,
      //     })
      //   );

      //   await db.part.createMany({
      //     data: partsData,
      //   });
      // }

      await db.user.update({
        where: {
          id: data.user.id,
        },
        data: {
          collection: collection.id,
          box: box.id,
        },
      });
    },
    async updateUser(data) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(data) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(data) {
      /* session is active */
    },
  },
  logger: {
    error(code, metadata) {
      //
    },
    warn(code) {
      //
    },
    debug(code, metadata) {
      //
    },
  },
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect(authRoutes.default);
};
