"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import Box from "./_components/Box";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProfileAvatar from "./_components/ProfileAvatar";
import Link from "next/link";
import { mainRoutes } from "@/config/routes";

const Page = () => {
     return (
          <ScrollArea className="flex w-full h-full none-scroll-bar overflow-y-auto">
               <div className="flex flex-col mx-auto max-w-6xl w-full h-full px-[30px] lg:px-0">
                    <div className="flex gap-x-[15px] justify-between items-center py-[18px] border-b-[2px] border-primary/5">
                         <Link
                              href={mainRoutes.default}
                              className="flex-grow text-[22px] font-bold text-text">
                              MuliBox
                         </Link>

                         <div className="hidden md:flex gap-x-[10px] items-center">
                              <p className="text-[15px] text-slate-800">
                                   Start reviewing all today&apos;s cards
                              </p>

                              <Button variant="secondary" className="flex text-[12px] sm:text-[14px] gap-x-[5px]">
                                   Add New Card
                                   <Plus className="w-[15px] h-[15px]" />
                              </Button>

                              <ProfileAvatar />
                         </div>
                    </div>

                    <div className="flex-grow py-[30px]">
                         <Box />
                    </div>
               </div>
          </ScrollArea>
     );
}

export default Page;