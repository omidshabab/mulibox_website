"use client"

import React from "react"
import CardDialog from "@/components/CardDialog";
import IconButton from "@/components/IconButton";
import { BrickWallIcon } from "lucide-react";

const MyCards = ({
     isMobile = false
}: {
     isMobile?: boolean
}) => {
     return (
          <CardDialog>
               {!isMobile ? (
                    <p className="text-[15px] text-slate-800 font-medium hover:text-slate-500 cursor-pointer transition-all duration-500">
                         my cards
                    </p>
               ) : (
                    <div className="group/close-button w-[80px] flex flex-col justify-center items-center gap-y-[10px] text-center bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                         <IconButton icon={BrickWallIcon} />
                         <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                              my cards
                         </p>
                    </div>
               )}
          </CardDialog>
     );
}

export default MyCards;