import Box from "./_components/Box";
import ProfileAvatar from "./_components/ProfileAvatar";
import Link from "next/link";
import { mainRoutes } from "@/config/routes";
import AddNewCard from "@/components/AddNewCard";
import { Spacer } from "@nextui-org/react";
import MenuDrawer from "./_components/MenuDrawer";
import MyCards from './_components/MyCards';
import { trpc } from "@/lib/trpc/client";
import { api } from "@/lib/trpc/api";

export const revalidate = 0;

const Page = async () => {
     const { cards } = await api.cards.getCards.query()

     return (
          <div className="flex w-full px-[30px] lg:px-[20px] max-w-6xl">
               <div className="flex flex-col w-full h-full items-center mb-[80px]">
                    <div className="mx-auto flex justify-center w-full z-[20]">
                         <div className="flex flex-col w-full items-center">
                              <div className="flex w-full h-[80px] gap-x-[15px] justify-between items-center py-[18px] border-primary/5 border-b-[2px]">
                                   <div className="flex">
                                        <Link
                                             href={mainRoutes.default}
                                             className="flex-grow text-[22px] font-bold text-text focus:outline-none">
                                             mulibox.
                                        </Link>
                                   </div>

                                   <div className="hidden md:flex gap-x-[10px] items-center">
                                        <div className="flex gap-x-[20px]">
                                             <MyCards />

                                             <p className="text-[15px] text-slate-800 font-medium">
                                                  today&apos;s cards
                                             </p>
                                        </div>

                                        <Spacer x={2} />

                                        <AddNewCard />

                                        <ProfileAvatar />
                                   </div>

                                   <div className="flex gap-x-[10px] md:hidden">
                                        <ProfileAvatar isMobile />

                                        <MenuDrawer />
                                   </div>
                              </div>
                              <div className="flex justify-center items-center w-full max-w-6xl px-[20px] py-[8px] text-center bg-primary/[3%] border-primary/5 border-b-[2px] font-medium text-text text-[15px]">
                                   Harry up! You need to review 24 cards today
                              </div>
                         </div>
                    </div>

                    {cards && (
                         <Box cards={cards} />
                    )}

                    {!cards && (
                         <div>loading box ...</div>
                    )}
               </div>
               <div className="block sm:hidden absolute bottom-0 right-0 pb-[15px] pr-[15px]">
                    <AddNewCard type="icon" />
               </div>
          </div>
     );
}

export default Page;
