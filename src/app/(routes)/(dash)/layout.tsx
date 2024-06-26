import NextAuthProvider from "@/lib/auth/Provider";
import { checkAuth } from "@/lib/auth/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tMetadata = getTranslations("cards_metadata")

     return {
          title: (await tMetadata)("title"),
          description: (await tMetadata)("description"),
          manifest: "/manifest.json",
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
                    <div className="flex w-full h-full justify-center lg:px-[20px]">
                         {children}
                    </div>
               </TrpcProvider>
          </NextAuthProvider>
     )
}