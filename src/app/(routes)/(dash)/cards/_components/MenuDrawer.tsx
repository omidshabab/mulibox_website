import * as React from "react"
import {
     Drawer,
     DrawerClose,
     DrawerContent,
     DrawerDescription,
     DrawerHeader,
     DrawerTitle,
     DrawerTrigger,
} from "@/components/ui/drawer"
import MenuIcon from "@/components/icons/Menu"
import { Button } from "@/components/ui/button";
import IconButton from "@/components/IconButton";
import { BrickWallIcon, CalendarDaysIcon, ShrinkIcon, X } from "lucide-react";

const MenuDrawer = () => {
     return (
          <Drawer>
               <DrawerTrigger asChild>
                    <MenuIcon className="w-[25px]" />
               </DrawerTrigger>
               <DrawerContent>
                    <DrawerHeader className="text-text">
                         <DrawerTitle className="text-center">Just Select What You Want</DrawerTitle>
                         <DrawerDescription />
                    </DrawerHeader>
                    <div className="mx-auto w-full max-w-sm px-[25px] pb-[20px] flex flex-col gap-y-[20px]">
                         <div className="text-slate-800 text-[16px] font-normal text-center">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         </div>

                         <div className="flex w-full gap-x-[15px] justify-center items-center">
                              {/* <DrawerClose>
                                   <Button
                                        variant="secondary"
                                        className="text-[15px] font-semibold">
                                        my cards
                                   </Button>
                              </DrawerClose>

                              <DrawerClose>
                                   <Button
                                        variant="secondary"
                                        className="text-[15px] font-semibold">
                                        today&apos;s cards
                                   </Button>
                              </DrawerClose> */}

                              <DrawerClose>
                                   <div className="group/close-button w-[80px] flex flex-col justify-center items-center gap-y-[10px] text-center bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                        <IconButton icon={BrickWallIcon} />
                                        <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                             my cards
                                        </p>
                                   </div>
                              </DrawerClose>

                              <DrawerClose>
                                   <div className="group/close-button w-[80px] flex flex-col justify-center items-center gap-y-[10px] text-center bg-primary/5 hover:bg-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                        <IconButton icon={CalendarDaysIcon} />
                                        <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem]">
                                             today&apos;s cards
                                        </p>
                                   </div>
                              </DrawerClose>

                         </div>

                         <div className="text-slate-800 text-[13px] font-normal text-center">
                              Lorem ipsum dolor sit
                         </div>
                    </div>
               </DrawerContent>
          </Drawer>
     );
}

export default MenuDrawer;