import { dashRoutes } from "@/config/routes";
import { getUserAuth } from "@/lib/auth/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react"

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("register_metadata")

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
     children: React.ReactNode
}) {
     const session = await getUserAuth();
     if (session?.session) redirect(dashRoutes.default);

     return (
          <div className="flex w-full h-screen justify-center items-center">
               {children}
          </div>
     )
}