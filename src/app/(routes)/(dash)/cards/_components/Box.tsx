"use client"

import BoxSection from "./BoxSection"
import { BoxSectionType } from "@/lib/cards"
import AddNewCard from "@/components/AddNewCard"
import Designer from "@/components/svg/designer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CompleteCard } from "@/lib/db/schema/cards"
import { trpc } from "@/lib/trpc/client"
import { categorizeCards } from "@/lib/cards/utils"
import Loading from "@/app/(routes)/loading"

const Box = ({ cards }: { cards: CompleteCard[] }) => {
     const { data: t } = trpc.cards.getCards.useQuery(undefined, {
          initialData: { cards },
          refetchOnMount: false,
     });

     if (!t) {
          return <Loading />
     }

     const categorizedCards = categorizeCards(t.cards);

     if (t.cards.length === 0) {
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
                         cards={categorizedCards[BoxSectionType.one]} />

                    <BoxSection
                         type={BoxSectionType.two}
                         cards={categorizedCards[BoxSectionType.two]} />

                    <BoxSection
                         type={BoxSectionType.three}
                         cards={categorizedCards[BoxSectionType.three]} />

                    <BoxSection
                         type={BoxSectionType.four}
                         cards={categorizedCards[BoxSectionType.four]} />

                    <BoxSection
                         type={BoxSectionType.five}
                         cards={categorizedCards[BoxSectionType.five]} />
               </div>
          </ScrollArea>
     );
}

export default Box;