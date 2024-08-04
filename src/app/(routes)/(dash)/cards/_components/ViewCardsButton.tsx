"use client"

import { Button } from "@/components/ui/button";
import { useCardDialog } from "@/hooks/use-dialog-store";
import { AlignCenterHorizontalIcon } from "lucide-react";

const ViewCardsButton = () => {
     const setCardDialogOpen = useCardDialog((state) => state.setOpen)

     return (
          <div>
               <Button
                    variant="secondary"
                    onClick={() => setCardDialogOpen()}
                    className="flex text-[12px] sm:text-[14px] gap-x-[5px] font-normal">
                    View Your Cards
                    <AlignCenterHorizontalIcon className="w-[15px] h-[15px]" />
               </Button>
          </div>
     );
}

export default ViewCardsButton;