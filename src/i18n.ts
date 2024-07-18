import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";
import { mainRoutes } from "./config/routes";
import { getUserLocale } from "./db";

async function getConfig(locale: string) {
  if (!locales.includes(locale as any)) redirect(mainRoutes.default);

  return {
    messages: (await import(`../translations/${locale}.json`)).default,
  };
}

export default getRequestConfig(async (params) => {
  const isAppRoute = headers().get("x-app-route") === "true";

  if (isAppRoute) {
    const locale = await getUserLocale();

    return {
      locale,
      ...(await getConfig(locale)),
    };
  } else {
    const locale = params.locale;
    return getConfig(locale);
  }
});
