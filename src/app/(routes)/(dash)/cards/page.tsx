import Box from "./_components/Box";
import AddNewCard from "@/components/AddNewCard";
import { api } from "@/lib/trpc/api";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import ContentWrapper from "@/components/ContentWrapper";
import Loader from "@/components/Loader";

export const revalidate = 0;

const Page = async () => {
     const { box } = await api.box.getBox.query()

     const tGeneral = getTranslations("general")

     return (
          <ContentWrapper>
               <div className="flex flex-col w-full h-full items-center mb-[80px]">
                    <div className="mx-auto flex justify-center w-full z-[20]">
                         <div className="flex flex-col w-full items-center">
                              <Navbar type="dash" />

                              <div className="flex justify-center items-center w-full max-w-6xl px-[20px] py-[8px] text-center bg-primary/[3%] border-primary/5 border-b-[2px] font-medium text-text text-[15px]">
                                   Harry up! You need to review 24 cards today
                              </div>
                         </div>
                    </div>

                    {box && (
                         <Box box={box} />
                    )}

                    {!box && (
                         <div className="flex flex-grow h-full">
                             <Loader />
                         </div>
                    )}
               </div>
               <div className="block sm:hidden absolute bottom-0 right-0 pb-[15px] pr-[15px]">
                    <AddNewCard type="icon" />
               </div>
          </ContentWrapper>
     );
}

export default Page;
