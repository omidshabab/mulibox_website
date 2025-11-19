"use client"

import React from "react";
import { Box } from "@/lib/db/schema/boxes";
import DialogWrapper from "../DialogWrapper";
import { useBoxDialog } from "@/hooks/use-dialog-store";
import IconButton from "../IconButton";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type BoxDialogContentProps = {
     boxes?: Box[];
};

const BoxDialogContent = React.forwardRef<HTMLDivElement, BoxDialogContentProps>(({
     boxes = [],
}, ref) => {
     const setDialogClose = useBoxDialog((state) => state.setClose)

     return (
          <div ref={ref}>
               <DialogWrapper
                    title="boxes"
                    subtitle="your boxes are here"
                    buttons={
                         <div
                              onClick={() => null}
                              className={cn(
                                   "group/new-button flex flex-col justify-center items-center gap-y-[10px] text-center",
                                   // loadings && "group-hover/new-button:opacity-50 group-hover/new-button:cursor-not-allowed"
                              )}>
                              <IconButton
                                   // disabled={loadings}
                                   icon={PlusIcon}
                                   className={cn(
                                        // loadings && "group-hover/new-button:cursor-not-allowed"
                                   )} />
                         </div>}
                    onClose={() => setDialogClose()}>
                    <div className="flex w-full">
                         <ScrollArea className="w-full">
                              <div className="w-full grid grid-cols-4 gap-y-[25px] gap-x-[15px]">
                                   {[1, 2, 3, 4, 5, 6].map((index) => (
                                        <div key={index} className="flex flex-col gap-y-[10px] cursor-pointer select-none">
                                             {index}
                                             <div className="flex justify-center items-center w-full aspect-video border-[1px] border-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                                  {index}
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </ScrollArea>
                    </div>
               </DialogWrapper>
          </div>
     );
})

BoxDialogContent.displayName = "BoxDialogContent";

export default BoxDialogContent;