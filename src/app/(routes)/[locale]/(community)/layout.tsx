import { Container } from "@/components/craft"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("community_metadata")

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
          <ScrollArea className="w-full h-screen">
               <Container className="max-w-6xl">
                    <Navbar type="community" />
               </Container>

               {children}

               <Footer className="max-w-6xl" />
          </ScrollArea>
     )
}