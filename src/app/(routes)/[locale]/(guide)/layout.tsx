import Footer from "@/components/Footer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("guide_metadata")

     return {
          title: {
               default: `${(await tMetadata)("title")}${(await tGeneral)("separator")} ${(await tGeneral)("mulibox")}.`,
               template: `%s${(await tGeneral)("separator")} ${(await tMetadata)("title")}.`,
          },
          description: (await tMetadata)("desc"),
     }
}

export default function layout({
     children
}: {
     children: React.ReactNode
}) {
     return (
          <ScrollArea className="flex w-full h-screen">
               {children}

               <Footer />
          </ScrollArea>
     )
}