"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import Box from "./_components/Box";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Page = () => {
     return (
          <ScrollArea className="flex w-full h-full none-scroll-bar overflow-y-auto">
               <div className="flex flex-col mx-auto max-w-6xl w-full h-full px-[30px] lg:px-0">
                    <div className="flex gap-x-[15px] justify-between items-center py-[18px] border-b-[2px] border-primary/5">
                         <div className="flex-grow text-[22px] font-bold text-text">
                              MuliBox
                         </div>

                         <div className="flex gap-x-[10px] items-center">
                              <p className="text-[15px] text-slate-800">
                                   Start reviewing all today&apos;s cards
                              </p>

                              <Button variant="secondary" className="flex gap-x-[5px]">
                                   Add New Card
                                   <Plus className="w-[15px] h-[15px]" />
                              </Button>

                              <div className="w-[40px] h-[40px] rounded-full bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all duration-500">

                              </div>
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