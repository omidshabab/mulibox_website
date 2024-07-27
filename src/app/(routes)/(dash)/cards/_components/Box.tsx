"use client"

import BoxSection from "./BoxSection"
import { BoxSectionType } from "@/lib/cards"
import AddNewCard from "@/components/AddNewCard"
import Designer from "@/components/svg/designer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CompleteBox } from "@/lib/db/schema/box"
import { trpc } from "@/lib/trpc/client"
import { categorizeCards } from "@/lib/cards/utils"
import Loader from "@/components/Loader"

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
                         <Designer />
                         <p className="text-[18px] font-medium">
                              Create and add your first cards to the leitner box and start using it
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
                         cards={t.box?.sections.find(section => section.type === "one")?.parts[0].cards ?? []} />

                    <BoxSection
                         type={BoxSectionType.two}
                         cards={t.box?.sections.find(section => section.type === "two")?.parts[0].cards ?? []} />

                    <BoxSection
                         type={BoxSectionType.three}
                         cards={t.box?.sections.find(section => section.type === "three")?.parts[0].cards ?? []} />

                    <BoxSection
                         type={BoxSectionType.four}
                         cards={t.box?.sections.find(section => section.type === "four")?.parts[0].cards ?? []} />

                    <BoxSection
                         type={BoxSectionType.five}
                         cards={t.box?.sections.find(section => section.type === "five")?.parts[0].cards ?? []} />
               </div>
          </ScrollArea>
     );
}

export default Box;