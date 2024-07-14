import NextAuthProvider from "@/lib/auth/Provider";
import { checkAuth } from "@/lib/auth/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";

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

     return (
          <NextAuthProvider>
               <TrpcProvider cookies={cookies().toString()}>
                    <div className="flex w-full h-full justify-center">
                         {children}
                    </div>
               </TrpcProvider>
          </NextAuthProvider>
     )
}