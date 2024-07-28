"use client"

import BoxSection from "./BoxSection"
import { BoxSectionType } from "@/lib/cards"
import AddNewCard from "@/components/AddNewCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CompleteBox } from "@/lib/db/schema/box"
import { trpc } from "@/lib/trpc/client"
import { categorizeCards } from "@/lib/cards/utils"
import Loader from "@/components/Loader"
import { BoxIcon } from "lucide-react"

const Box = ({ box }: { box: CompleteBox }) => {
     const { data: t } = trpc.box.getBox.useQuery(undefined, {
          initialData: { box },
          refetchOnMount: false,
     });

     if (!t) {
          return <Loader />
     }

     // const categorizedCards = categorizeCards(t.cards);

     if (t.box?.sections.every(section => section.parts.every(part => part.cards.length === 0))) {
          return (
               <div className="flex justify-center items-center w-full h-full flex-grow">
                    <div className="flex flex-col gap-y-[20px] justify-center items-center w-full h-full flex-grow max-w-[350px] text-center px-[30px] lg:px-0 py-[50px]">
                         <div className="flex items-center justify-center bg-primary/5 p-[20px] rounded-full backdrop-blur-[1px] border-primary/5 border-[5px] border-dashed">
                              <BoxIcon className="w-[80px] h-[80px] text-text opacity-10" />
                         </div>
                         <p className="text-[18px] text-slate-600 font-light">
                              Review your first cards to the leitner box and start using it
                         </p>
                         <AddNewCard />
                    </div>
               </div>
          );
     }

     return (
          <ScrollArea className="flex justify-center items-center w-full h-full flex-grow">
               <div className="grid grid-cols-4 md:grid-cols-10 gap-x-5 gap-y-10 py-[25px] lg:py-[30px]">
                    <BoxSection
                         type={BoxSectionType.one}
                         parts={t.box?.sections.find(section => section.type === "one")?.parts} />

                    <BoxSection
                         type={BoxSectionType.two}
                         parts={t.box?.sections.find(section => section.type === "two")?.parts} />

                    <BoxSection
                         type={BoxSectionType.three}
                         parts={t.box?.sections.find(section => section.type === "three")?.parts} />

                    <BoxSection
                         type={BoxSectionType.four}
                         parts={t.box?.sections.find(section => section.type === "four")?.parts} />

                    <BoxSection
                         type={BoxSectionType.five}
                         parts={t.box?.sections.find(section => section.type === "five")?.parts} />
               </div>
          </ScrollArea>
     );
}

export default Box;