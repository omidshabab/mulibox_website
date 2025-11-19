import { randomUUID } from "crypto";
import type { GenericEndpointContext } from "better-auth";
import { auth } from "@/lib/auth/utils";
import { db } from "@/lib/db";

function createSessionContext(
  ctx: Awaited<typeof auth.$context>,
  request: Request,
): GenericEndpointContext {
  const responseHeaders = new Headers();
  const getCookie: GenericEndpointContext["getCookie"] = (key, prefix) => {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
      return null;
    }

    const cookies = cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const [cookieKey, ...valueParts] = cookie.split("=");
        return [cookieKey, valueParts.join("=")] as const;
      });

    const cookieMap = new Map(cookies);
    const prefixedKey =
      prefix === "secure"
        ? `__Secure-${key}`
        : prefix === "host"
          ? `__Host-${key}`
          : key;

    return cookieMap.get(prefixedKey) ?? cookieMap.get(key) ?? null;
  };

  const setCookie: GenericEndpointContext["setCookie"] = (
    key,
    value,
    _options,
  ) => {
    const cookie = `${key}=${value}`;
    responseHeaders.append("set-cookie", cookie);
    return cookie;
  };

  const getSignedCookie: GenericEndpointContext["getSignedCookie"] = async (
    key,
    _secret,
    prefix,
  ) => getCookie(key, prefix);

  const setSignedCookie: GenericEndpointContext["setSignedCookie"] = async (
    key,
    value,
    _secret,
    options,
  ) => setCookie(key, value, options);

  const json: GenericEndpointContext["json"] = async (payload, _response) =>
    payload;

  const redirect: GenericEndpointContext["redirect"] = () => {
    throw new Error("Redirect is not supported in auth smoke tests.");
  };

  const error: GenericEndpointContext["error"] = () => {
    throw new Error("API errors are not supported in auth smoke tests.");
  };

  return {
    method: "POST",
    path: "/api/auth/smoke",
    body: undefined as never,
    query: undefined,
    params: {} as Record<string, any>,
    request,
    headers: request.headers,
    setHeader: (key, value) => {
      responseHeaders.set(key, value);
    },
    getHeader: (key) => responseHeaders.get(key),
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    json,
    context: ctx,
    redirect,
    error,
  };
}

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

  const sessionContext = createSessionContext(ctx, request);

  const session = await ctx.internalAdapter.createSession(
    user.id,
    sessionContext,
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

