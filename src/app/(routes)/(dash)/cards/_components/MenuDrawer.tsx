"use client"

import * as React from "react"
import MenuIcon from "@/components/icons/Menu"
import IconButton from "@/components/IconButton";
import { CalendarDaysIcon, ChevronFirstIcon, GroupIcon, HelpCircleIcon } from "lucide-react";
import MyCards from "./MyCards";
import { Drawer } from "./Drawer";
import { useCardDialog } from "@/hooks/use-card-dialog-store";
import { Activity } from "react-iconly";

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
                    <div className="flex flex-col gap-y-[15px]">
                         <div className="flex flex-col gap-y-[5px]">
                              <div className="text-slate-800 font-normal text-[18px] leading-[1.8rem]">
                                   Choose What You Really Want
                              </div>
                              <div className="text-slate-600 font-light text-[15px] leading-[1.6rem]">
                                   Lorem ipsum dolor sit, amet consectetur adipisicing elit amet consectetur
                              </div>
                         </div>

                         <div className="grid grid-cols-2 w-full gap-x-[10px] gap-y-[10px]">
                              <div onClick={handleClose}>
                                   <MyCards isMobile />
                              </div>

                              <div className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                   <IconButton icon={CalendarDaysIcon} />
                                   <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                        today&apos;s cards
                                   </p>
                              </div>

                              <div className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                   <IconButton icon={ChevronFirstIcon} />
                                   <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                        my collects
                                   </p>
                              </div>

                              <div className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                   <IconButton icon={ChevronFirstIcon} />
                                   <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                        explore commun
                                   </p>
                              </div>

                              <div className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                   <IconButton icon={Activity} />
                                   <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                        my status
                                   </p>
                              </div>

                              <div className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                   <IconButton icon={HelpCircleIcon} />
                                   <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                        ultimate guide
                                   </p>
                              </div>
                         </div>
                    </div>
               </Drawer>
          </div>
     );
}

export default MenuDrawer;