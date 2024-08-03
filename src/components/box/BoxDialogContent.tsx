"use client"

import React, { forwardRef } from "react";
import { Box } from "@/lib/db/schema/boxes";
import DialogWrapper from "../DialogWrapper";
import { useBoxDialog } from "@/hooks/use-dialog-store";
import IconButton from "../IconButton";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

const BoxDialogContent = forwardRef(({
     boxes = [],
}: {
     boxes?: Box[],
}, ref) => {
     const setDialogClose = useBoxDialog((state) => state.setClose)

     return (
          <div className="flex w-full justify-center">
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
                    <div>

                    </div>
               </DialogWrapper>
          </div>
     );
})

export default BoxDialogContent;