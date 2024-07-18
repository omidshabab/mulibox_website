import Document from "@/components/Document"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

type Props = {
     children: React.ReactNode;
     params: { locale: string };
};

export default async function layout({
     children,
     params: { locale }
}: Props) {
     const messages = await getMessages();

     return (
          <Document locale={locale}>
               <NextIntlClientProvider messages={messages}>
                    {children}
               </NextIntlClientProvider>
          </Document>
     )
}