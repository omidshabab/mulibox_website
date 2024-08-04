"use client"

import { BrickWallIcon } from "lucide-react";
import { useCardDialog } from "@/hooks/use-dialog-store";
import MenuItem from "../MenuItem";

const MyCards = () => {
     const setCardDialogOpen = useCardDialog((state) => state.setOpen)

     return (
          <MenuItem
               icon={BrickWallIcon}
               text="my cards"
               onClick={() => setCardDialogOpen()}
          />
     );
}

export default MyCards;