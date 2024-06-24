import Box from "./_components/Box";
import ProfileAvatar from "./_components/ProfileAvatar";
import Link from "next/link";
import { mainRoutes } from "@/config/routes";
import AddNewCard from "@/components/AddNewCard";
import { Spacer } from "@nextui-org/react";
import MenuDrawer from "./_components/MenuDrawer";

const Page = async () => {
     return (
          <div className="flex w-full">
               <div className="flex flex-col w-full h-full items-center mb-[80px]">
                    <div className="mx-auto flex justify-center w-full px-[30px] lg:px-0 z-[20]">
                         <div className="flex flex-col w-full items-center">
                              <div className="flex w-full h-[80px] max-w-6xl gap-x-[15px] justify-between items-center py-[18px] border-primary/5 border-b-[2px]">
                                   <div className="flex">
                                        <Link
                                             href={mainRoutes.default}
                                             className="flex-grow text-[22px] font-bold text-text focus:outline-none">
                                             mulibox.
                                        </Link>
                                   </div>

                                   <div className="hidden md:flex gap-x-[10px] items-center">
                                        <div className="flex gap-x-[20px]">
                                             <p className="text-[15px] text-slate-800 font-medium">
                                                  my cards
                                             </p>

                                             <p className="text-[15px] text-slate-800 font-medium">
                                                  today&apos;s cards
                                             </p>
                                        </div>

                                        <Spacer x={2} />

                                        <AddNewCard />

                                        <ProfileAvatar />
                                   </div>

                                   <div className="flex gap-x-[20px] md:hidden">
                                        <MenuDrawer />
                                   </div>
                              </div>
                              <div className="flex justify-center items-center w-full max-w-6xl px-[20px] py-[8px] text-center bg-primary/[3%] border-primary/5 border-b-[2px] font-medium text-text text-[15px]">
                                   Harry up! You need to review 24 cards today
                              </div>
                         </div>
                    </div>

                    <Box />
               </div>
               <div className="block sm:hidden absolute bottom-0 right-0 pb-[15px] pr-[15px]">
                    <AddNewCard type="icon" />
               </div>
          </div>
     );
}

export default Page;
