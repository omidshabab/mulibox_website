import NextAuthProvider from "@/lib/auth/Provider";
import { checkAuth } from "@/lib/auth/utils";
import { Metadata } from "next";
import Document from "@/components/Document";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import Providers from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("cards_metadata")

     return {
          title: {
               default: `${(await tMetadata)("title")}${(await tGeneral)("separator")} ${(await tGeneral)("mulibox")}.`,
               template: `%s${(await tGeneral)("separator")} ${(await tMetadata)("title")}.`,
          },
          description: (await tMetadata)("desc"),
     }
}

export default async function layout({
     children
}: {
     children: React.ReactNode,
}) {
     await checkAuth();

     const locale = await getLocale();

     const messages = await getMessages();

     return (
          <Document locale={locale}>
               <NextIntlClientProvider messages={messages}>
                    <NextAuthProvider>
                         <TrpcProvider cookies={cookies().toString()}>
                              <Providers>
                                   <div className="flex w-full h-full justify-center">
                                        {children}
                                   </div>
                              </Providers>
                         </TrpcProvider>
                    </NextAuthProvider>
               </NextIntlClientProvider>
          </Document>
     )
}