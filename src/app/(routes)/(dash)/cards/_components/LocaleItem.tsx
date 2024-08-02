"use client"

import IconButton from "@/components/IconButton";
import { DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { EarthIcon } from "lucide-react";

const LocaleItem = ({
     text,
     active = false,
     onClick,
}: {
     text: string,
     active?: boolean,
     onClick: () => VoidFunction | void,
}) => {
     return (
          <DialogClose className="outline-none">
               <div
                    onClick={onClick}
                    className={cn(
                         "group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[8px] bg-primary/5 hover:bg-primary/10 px-[10px] py-[10px] rounded-[15px] select-none cursor-pointer",
                         active && "border-[2px] border-primary/5 bg-primary/10"
                    )}>
                    <IconButton icon={EarthIcon} group="close-button" className="h-[25px] w-[25px] sm:h-[35px] sm:w-[35px] p-1 border-[2px]" />
                    <div className="flex flex-col items-start justify-center">
                         <div className="hidden sm:block w-full text-[13px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem] line-clamp-2 text-ellipsis">
                              PERSIAN
                         </div>
                         <div className="flex w-full gap-x-[3px] text-[13px] font-extralight mt-[-5px] text-slate-600">
                              <span className="hidden sm:block">/</span> en
                         </div>
                    </div>
               </div>
          </DialogClose>
     );
}

export default LocaleItem;