"use client"

import React from "react";
import { useStatusDialog } from "@/hooks/use-dialog-store";
import DialogWrapper from "../DialogWrapper";
import { ArrowUpRightIcon } from "lucide-react";

const StatusDialogContent = React.forwardRef((ref) => {
     const setDialogClose = useStatusDialog((state) => state.setClose)

     return (
          <DialogWrapper
               title="status"
               subtitle="your status is here"
               onClose={() => setDialogClose()}>
               <div className="flex flex-col w-full gap-y-[10px] sm:gap-y-[25px]">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-[10px] gap-y-[10px] sm:gap-x-[25px] sm:gap-y-[25px]">
                         {[1, 2, 3, 4].map((index) => (
                              <div key={index} className="relative flex justify-center items-center w-full aspect-video border-[1px] border-primary/10 px-[15px] py-[10px] rounded-[15px]">

                                   <div className="absolute bottom-[10px] right-[10px] text-text">
                                        <ArrowUpRightIcon className="w-[30px] h-[30px] bg-primary/5 rounded-full p-[5px]" />
                                   </div>
                              </div>
                         ))}
                    </div>

                    <div className="grid grid-cold-1 sm:grid-cols-2 gap-x-[10px] gap-y-[10px] sm:gap-x-[25px]">
                         {[1, 2].map((index) => (
                              <div key={index} className="flex justify-center items-center w-full aspect-video border-[1px] border-primary/10 px-[15px] py-[10px] rounded-[15px]">

                              </div>
                         ))}
                    </div>

                    <div className="flex justify-center items-center w-full h-[100px] border-[1px] border-primary/10 px-[15px] py-[10px] rounded-[15px]">

                    </div>
               </div>
          </DialogWrapper>
     );
})

export default StatusDialogContent;