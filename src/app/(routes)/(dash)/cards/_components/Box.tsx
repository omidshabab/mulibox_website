import BoxSection from "./BoxSection"
import { categorizeCards } from "@/lib/cards/utils"
import { BoxSectionType } from "@/lib/cards"
import AddNewCard from "@/components/AddNewCard"
import Designer from "@/components/svg/designer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { api } from "@/lib/trpc/api"

const Box = async () => {
     const { cards } = await api.cards.getCards.query();

     const categorizedCards = categorizeCards(cards);

     return (
          <>
               {cards.length > 0 ? (
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
               ) : (
                    <div className="flex justify-center items-center w-full h-full flex-grow">
                         <div className="flex flex-col gap-y-[20px] justify-center items-center w-full h-full flex-grow max-w-[350px] text-center px-[30px] lg:px-0 py-[50px]">
                              <Designer />
                              <p className="text-[18px] font-medium">
                                   Create and add your first cards to the leitner box and start using it
                              </p>
                              <AddNewCard />
                         </div>
                    </div>
               )}

               {/* {JSON.stringify(cards)} */}
          </>
     );
}

export default Box;