import type { Metadata } from "next";
import "@/styles/globals.css";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { LangDir, LangFont } from "@/lib/fonts";
import { GoogleAnalytics } from "@next/third-parties/google"
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { env } from "@/lib/env.mjs";

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
  return {
    manifest: "/manifest.json",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  const font = LangFont(locale);
  const dir = LangDir(locale);

  return (
    <html lang={locale} dir={dir}>
      <body
        className={font}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}>
          {children}
          <Toaster
            font={font}
            others={{
              position: "top-center",
            }} />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
