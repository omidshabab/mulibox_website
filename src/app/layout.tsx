import type { Metadata } from "next";
import "@/styles/globals.css";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LangDir, LangFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
  const tGeneral = getTranslations("general")
  const tMetadata = getTranslations("metadata")

  return {
    title: {
      default: (await tGeneral)("mulibox"),
      template: `%s - ${(await tMetadata)("name")}`,
    },
    description: (await tMetadata)("description"),
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
        suppressHydrationWarning={true}
        className={cn(
          font,
          "relative flex min-h-screen w-full items-center justify-center"
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
