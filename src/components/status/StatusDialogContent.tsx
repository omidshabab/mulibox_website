"use client"

import React from "react";
import { useStatusDialog } from "@/hooks/use-dialog-store";
import DialogWrapper from "../DialogWrapper";

const StatusDialogContent = React.forwardRef((ref) => {
     const setDialogClose = useStatusDialog((state) => state.setClose)

     return (
          <DialogWrapper
               title="status"
               subtitle="your status is here"
               onClose={() => setDialogClose()}>
               <div>

               </div>
          </DialogWrapper>
     );
})

export default StatusDialogContent;