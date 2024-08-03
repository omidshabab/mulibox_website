"use client"

import React, { forwardRef } from "react"
import { Collection } from "@/lib/db/schema/collections"
import { useCollectionDialog } from "@/hooks/use-dialog-store"
import DialogWrapper from "../DialogWrapper"
import { cn } from "@/lib/utils"
import IconButton from "../IconButton"
import { PlusIcon } from "lucide-react"

const CollectionDialogContent = forwardRef(({
     collections = [],
}: {
     collections?: Collection[],
}, ref) => {
     const setDialogClose = useCollectionDialog((state) => state.setClose)

     return (
          <div className="flex w-full justify-center">
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
                    <div>

                    </div>
               </DialogWrapper>
          </div>
     );
})

export default CollectionDialogContent;