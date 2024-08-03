"use client"

import { useStatusDialog } from "@/hooks/use-dialog-store";
import DialogWrapper from "../DialogWrapper";
import { forwardRef } from "react";

const StatusDialogContent = forwardRef((ref) => {
     const setDialogClose = useStatusDialog((state) => state.setClose)

     return (
          <div className="flex w-full justify-center">
               <DialogWrapper
                    title="status"
                    subtitle="your status is here"
                    onClose={() => setDialogClose()}>
                    <div>

                    </div>
               </DialogWrapper>
          </div>
     );
})

export default StatusDialogContent;