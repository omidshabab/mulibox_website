"use client"

import { Activity } from "react-iconly";
import MenuItem from "../MenuItem";
import { useStatusDialog } from "@/hooks/use-dialog-store";

const MyStatus = () => {
     const setStatusDialogOpen = useStatusDialog((state) => state.setOpen)

     return (
          <MenuItem
               icon={Activity}
               text="status analytics"
               onClick={() => setStatusDialogOpen()}
          />
     );
}

export default MyStatus;