"use client"

import * as React from "react"
import MenuIcon from "@/components/icons/Menu"
import IconButton from "@/components/IconButton";
import { CalendarDaysIcon } from "lucide-react";
import MyCards from "./MyCards";
import { Drawer } from "./Drawer";
import { useCardDialog } from "@/hooks/use-card-dialog-store";

const MenuDrawer = () => {
     const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

     const setCardDialogOpen = useCardDialog((state) => state.setOpen)

     const handleOpen = () => setIsDrawerOpen(true);

     const handleClose = () => setIsDrawerOpen(false);

     return (
          <div className="flex flex-col justify-center items-center">
               <MenuIcon
                    onClick={handleOpen}
                    className="w-[25px]" />

               <Drawer open={isDrawerOpen} onClose={handleClose}>
                    <div className="flex w-full gap-x-[15px]">
                         <div onClick={handleClose}>
                              <MyCards isMobile />
                         </div>

                         <div className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                              <IconButton icon={CalendarDaysIcon} />
                              <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                   today&apos;s cards
                              </p>
                         </div>
                    </div>
               </Drawer>
          </div>
     );
}

export default MenuDrawer;