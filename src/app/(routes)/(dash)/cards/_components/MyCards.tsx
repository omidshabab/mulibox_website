"use client"

import IconButton from "@/components/IconButton";
import { BrickWallIcon } from "lucide-react";
import { useCardDialog } from "@/hooks/use-card-dialog-store";

const MyCards = ({
     isMobile = false
}: {
     isMobile?: boolean
}) => {
     const setCardDialogOpen = useCardDialog((state) => state.setOpen)

     return (
          <div onClick={() => setCardDialogOpen()}>
               {!isMobile ? (
                    <p className="text-[15px] text-slate-800 font-medium hover:text-slate-500 cursor-pointer transition-all duration-500">
                         my cards
                    </p>
               ) : (
                    <div className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                         <IconButton icon={BrickWallIcon} />
                         <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem] line-clamp-2 text-ellipsis">
                              my cards
                         </p>
                    </div>
               )}
          </div>
     );
}

export default MyCards;