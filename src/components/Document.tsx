import "@/styles/globals.css";
import { LangDir, LangFont } from "@/lib/fonts";
import { GoogleAnalytics } from "@next/third-parties/google"
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env.mjs";

type Props = {
     children: React.ReactNode;
     locale: string;
};

const Document = ({
     children,
     locale
}: Props) => {
     const font = LangFont(locale);
     const dir = LangDir(locale);

     return (
          <html lang={locale} dir={dir}>
               <body
                    className={font}>
                    <main
                         className="w-full h-screen bg-grid-black/[0.1] relative flex items-center justify-center">
                         <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                         <div className="w-full h-full z-20">
                              {children}
                         </div>
                    </main>
                    <Toaster
                         font={font}
                         others={{
                              position: "top-center",
                         }} />
               </body>
               <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID} />
          </html>
     );
}

export default Document