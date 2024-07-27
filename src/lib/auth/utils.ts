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
    async signIn(message) {
      /* on successful sign in */
    },
    async signOut(message) {
      /* on signout */
    },
    async createUser(data) {
      /* user created */
      const collection = await db.collection.create({
        data: {
          userId: data.user.id,
          name: "default collection",
          default: true,
        },
      });

      const box = await db.box.create({
        data: {
          userId: data.user.id,
        },
      });

      /* Section One */
      const sectionOne = await db.section.create({
        data: {
          boxId: box.id,
          type: "one",
        },
      });

      const partOneSectionOne = await db.part.create({
        data: {
          sectionId: sectionOne.id,
        },
      });

      /* Section Two */
      const sectionTwo = await db.section.create({
        data: {
          boxId: box.id,
          type: "two",
        },
      });

      const partOneSectionTwo = await db.part.create({
        data: {
          sectionId: sectionTwo.id,
        },
      });

      const partTwoSectionTwo = await db.part.create({
        data: {
          sectionId: sectionTwo.id,
        },
      });

      /* Section Three */
      const sectionThree = await db.section.create({
        data: {
          boxId: box.id,
          type: "three",
        },
      });

      const partOneSectionThree = await db.part.create({
        data: {
          sectionId: sectionThree.id,
        },
      });

      const partTwoSectionThree = await db.part.create({
        data: {
          sectionId: sectionThree.id,
        },
      });

      const partThreeSectionThree = await db.part.create({
        data: {
          sectionId: sectionThree.id,
        },
      });

      const partFourSectionThree = await db.part.create({
        data: {
          sectionId: sectionThree.id,
        },
      });

      /* Section Four */
      const sectionFour = await db.section.create({
        data: {
          boxId: box.id,
          type: "four",
        },
      });

      const partOneSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      const partTwoSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      const partThreeSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      const partFourSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      const partFiveSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      const partSixSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      const partSevenSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      const partEightSectionFour = await db.part.create({
        data: {
          sectionId: sectionFour.id,
        },
      });

      /* Section Four */
      const sectionFive = await db.section.create({
        data: {
          boxId: box.id,
          type: "five",
        },
      });

      const partOneSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partTwoSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partThreeSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partFourSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partFiveSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partSixSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partSevenSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partEightSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partNineSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partTenSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partElevenSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partTwelveSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partThirteenSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partFourteenSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      const partFifteenSectionFive = await db.part.create({
        data: {
          sectionId: sectionFive.id,
        },
      });

      console.log(`collection created: ${collection.id}`);
      console.log(`box created: ${box.id}`);
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message) {
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
