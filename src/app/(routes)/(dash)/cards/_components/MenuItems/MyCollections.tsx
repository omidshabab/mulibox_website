"use client"

import { ChevronFirstIcon } from "lucide-react";
import MenuItem from "../MenuItem";
import { useCollectionDialog } from "@/hooks/use-dialog-store";

const MyCollections = () => {
     const setCollectionDialogOpen = useCollectionDialog((state) => state.setOpen)

     return (
          <MenuItem
               icon={ChevronFirstIcon}
               text="my collections"
               onClick={() => setCollectionDialogOpen()}
          />
     );
}

export default MyCollections;