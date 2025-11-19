import { authRoutes } from "@/config/routes";
import { db } from "@/lib/db";
import { resend } from "@/lib/email";
import { env } from "@/lib/env.mjs";
import VerifyEmail from "../../../emails/verify";
import { SectionType } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins/magic-link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const createDefaultResources = async (userId: string) => {
  const collection = await db.collection.create({
    data: {
      userId,
      name: "my collection",
    },
  });

  const box = await db.box.create({
    data: {
      userId,
    },
  });

  const sectionsData = [
    { type: "one" },
    { type: "two" },
    { type: "three" },
    { type: "four" },
    { type: "five" },
  ];

  for (const sectionData of sectionsData) {
    await db.section.create({
      data: {
        boxId: box.id,
        type: sectionData.type as SectionType,
      },
    });
  }

  await db.user.update({
    where: { id: userId },
    data: {
      collection: collection.id,
      box: box.id,
    },
  });
};

export const auth = betterAuth({
  appName: "Mulibox",
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    modelName: "user",
  },
  session: {
    modelName: "session",
  },
  account: {
    modelName: "account",
  },
  verification: {
    modelName: "verification",
  },
  plugins: [
    nextCookies(),
    magicLink({
      async sendMagicLink({ email, url }) {
        try {
          const result = await resend.emails.send({
            from: env.RESEND_FROM_EMAIL,
            to: [email],
            subject: "Confirm Your Email to Access Your Leitner Box Account",
            react: VerifyEmail({ url }),
          });

          if (result.error) {
            throw new Error(result.error.message ?? "Failed to send magic link");
          }
        } catch (error) {
          if (env.NODE_ENV !== "production") {
            console.warn(
              "[auth] Failed to send magic-link email via Resend. Logging link instead.",
              error
            );
            console.info(`[auth] Magic link for ${email}: ${url}`);
            return;
          }

          throw error instanceof Error
            ? error
            : new Error("Failed to send magic link");
        }
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        async after(user) {
          await createDefaultResources(user.id);
        },
      },
    },
  },
});

type SessionUser = {
  id: string;
  email?: string;
  name?: string;
  image?: string | null;
};

type SessionPayload = {
  user: SessionUser;
  token: string;
  expiresAt: Date;
};

export type AuthSession = {
  session: SessionPayload | null;
};

export const getUserAuth = async (): Promise<AuthSession> => {
  "use server";
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session || !session?.user) {
      return { session: null };
    }

    return {
      session: {
        user: {
          id: session.user.id,
          email: session.user.email ?? undefined,
          name: session.user.name ?? undefined,
          image: session.user.image ?? null,
        },
        token: session.session.token,
        expiresAt: session.session.expiresAt,
      },
    };
  } catch {
    return { session: null };
  }
};

export const checkAuth = async () => {
  "use server";
  const { session } = await getUserAuth();
  if (!session) redirect(authRoutes.default);
};
