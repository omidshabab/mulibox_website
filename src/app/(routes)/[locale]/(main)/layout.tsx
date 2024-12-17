import { Container } from "@/components/craft"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { dashRoutes } from "@/config/routes"
import { getUserAuth } from "@/lib/auth/utils"
import { capitalize } from "@/lib/utils"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

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
     const session = await getUserAuth();
     if (session?.session) redirect(dashRoutes.default);

     return (
          <div className="w-full h-screen">
               <Navbar />

               {children}

               {/* <Footer /> */}
          </div>
     )
}