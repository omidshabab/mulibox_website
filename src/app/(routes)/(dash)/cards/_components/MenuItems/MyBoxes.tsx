"use client"

import { BoxIcon } from "lucide-react";
import MenuItem from "../MenuItem";
import { useBoxDialog } from "@/hooks/use-dialog-store";

const MyBoxes = () => {
     const setBoxDialogOpen = useBoxDialog((state) => state.setOpen)

     return (
          <MenuItem
               icon={BoxIcon}
               text="my boxes"
               onClick={() => setBoxDialogOpen()}
          />
     );
}

export default MyBoxes;