import { randomUUID } from "crypto";
import { auth } from "@/lib/auth/utils";
import { db } from "@/lib/db";

async function authSmokeTest() {
  const ctx = await auth.$context;

  const email = `auth-smoke+${Date.now()}@mulibox.dev`;

  const user = await ctx.internalAdapter.createUser({
    email,
    name: "Auth Smoke",
    emailVerified: true,
    image: null,
  });

  const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const request = new Request(`${baseUrl}/api/auth/smoke`, {
    headers: new Headers({
      "user-agent": "auth-smoke-script",
      "x-forwarded-for": "127.0.0.1",
    }),
  });

  const session = await ctx.internalAdapter.createSession(
    user.id,
    {
      headers: request.headers,
      request,
      context: ctx,
    },
    false,
    {
      token: randomUUID(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
    true,
  );

  console.log("✅ Created user and session", {
    userId: user.id,
    sessionToken: session.token,
  });

  await db.session.delete({
    where: { token: session.token },
  });
  await db.user.delete({
    where: { id: user.id },
  });

  console.log("✅ Cleaned up smoke-test artifacts");
}

authSmokeTest()
  .then(() => {
    console.log("Auth smoke test completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Auth smoke test failed");
    console.error(error);
    process.exit(1);
  });

