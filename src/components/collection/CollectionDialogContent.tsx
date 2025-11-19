"use client"

import React from "react"
import { Collection } from "@/lib/db/schema/collections"
import { useCollectionDialog } from "@/hooks/use-dialog-store"
import DialogWrapper from "../DialogWrapper"
import { cn } from "@/lib/utils"
import IconButton from "../IconButton"
import { PlusIcon } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"

type CollectionDialogContentProps = {
     collections?: Collection[],
};

const CollectionDialogContent = React.forwardRef<HTMLDivElement, CollectionDialogContentProps>(({
     collections = [],
}, ref) => {
     const setDialogClose = useCollectionDialog((state) => state.setClose)

     return (
          <div ref={ref}>
               <DialogWrapper
                    title="collections"
                    subtitle="your collections are here"
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
                    <div className="flex gap-x-[30px] w-full">
                         <div className="flex flex-grow">
                              <ScrollArea className="w-full">
                                   <div className="w-full grid grid-cols-2 gap-y-[25px] gap-x-[15px]">
                                        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                                             <div key={index} className="flex flex-col gap-y-[10px] cursor-pointer select-none">
                                                  <div className="flex justify-center items-center aspect-square w-full border-[1px] border-primary/10 px-[15px] py-[10px] rounded-[15px]">

                                                  </div>

                                                  {index}
                                             </div>
                                        ))}
                                   </div>
                              </ScrollArea>
                         </div>

                         <div className="flex flex-grow bg-primary/5 rounded-[30px] px-[25px] py-[20px]">
                              <div className="text-text text-[18px]">
                                   Collection Details
                              </div>
                         </div>
                    </div>
               </DialogWrapper>
          </div>
     );
})

CollectionDialogContent.displayName = "CollectionDialogContent";

export default CollectionDialogContent;