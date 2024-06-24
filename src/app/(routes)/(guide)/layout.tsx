import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tMetadata = getTranslations("guide_metadata")

     return {
          title: (await tMetadata)("title"),
          description: (await tMetadata)("description"),
          manifest: "/manifest.json",
     }
}

export default async function layout({
     children
}: {
     children: React.ReactNode
}) {
     return (
          <div>
               {children}
          </div>
     )
}