import { capitalize } from "@/lib/utils"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("metadata")
     const tHomePageMetadata = getTranslations("homepage_metadata")

     return {
          title: {
               default: `${capitalize((await tGeneral)("mulibox"))}: ${(await tHomePageMetadata)("title")}`,
               template: `%s${(await tHomePageMetadata)("separator")} ${(await tMetadata)("title")}.`,
          },
          description: (await tMetadata)("desc"),
     }
}

export default async function layout({
     children
}: {
     children: React.ReactNode
}) {
     return children
}