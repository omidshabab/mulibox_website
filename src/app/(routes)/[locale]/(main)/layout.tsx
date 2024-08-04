import Footer from "@/components/Footer"
import { ScrollArea } from "@/components/ui/scroll-area"
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
               default: `${(await tGeneral)("mulibox")}${(await tGeneral)("separator")} ${(await tHomePageMetadata)("title")}`,
               template: `%s${(await tGeneral)("separator")} ${(await tMetadata)("title")}.`,
          },
          description: (await tHomePageMetadata)("desc"),
     }
}

export default async function layout({
     children
}: {
     children: React.ReactNode
}) {
     return (
          <ScrollArea className="w-full h-screen">
               {children}

               <Footer />
          </ScrollArea>
     )
}