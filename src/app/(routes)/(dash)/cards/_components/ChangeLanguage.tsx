"use client"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import LocaleItem from "./LocaleItem";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const ChangeLanguage = () => {
     const tGeneral = useTranslations("general");

     return (
          <Dialog>
               <DialogTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    <div className="flex gap-x-[5px] text-[15px] font-extralight text-slate-600 cursor-pointer select-none hover:opacity-80 transition-all duration-500">
                         <span className="font-light text-text">en</span><span className="hidden sm:block"> / {tGeneral("change_language")}</span>
                    </div>
               </DialogTrigger>

               <DialogContent className="max-w-[350px] sm:max-w-[450px] backdrop-blur-3xl px-[35px] py-[30px]">
                    <VisuallyHidden.Root>
                         <DialogTitle />
                         <DialogDescription />
                    </VisuallyHidden.Root>

                    <div className="grid grid-cols-3 gap-[10px]">
                         <LocaleItem text="EN" onClick={() => { }} active />

                         <LocaleItem text="DA" onClick={() => { }} />

                         <LocaleItem text="FA" onClick={() => { }} />

                         <LocaleItem text="FA" onClick={() => { }} />

                         <LocaleItem text="FA" onClick={() => { }} />

                         <LocaleItem text="FA" onClick={() => { }} />

                         <LocaleItem text="FA" onClick={() => { }} />

                         <LocaleItem text="FA" onClick={() => { }} />

                         <LocaleItem text="FA" onClick={() => { }} />
                    </div>
               </DialogContent>
          </Dialog>
     );
}

export default ChangeLanguage;