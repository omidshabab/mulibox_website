"use client"

import * as React from "react"
import MenuIcon from "@/components/icons/Menu"
import { Drawer } from "./Drawer";
import MyCards from "./MenuItems/MyCards";
import TodayCards from "./MenuItems/TodayCards";
import MyCollections from "./MenuItems/MyCollections";
import ExploreCommunity from "./MenuItems/ExploreCommunity";
import MyStatus from "./MenuItems/MyStatus";
import MyBoxes from "./MenuItems/MyBoxes";

const MenuDrawer = () => {
     const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

     const handleOpen = () => setIsDrawerOpen(true);

     const handleClose = () => setIsDrawerOpen(false);

     const tabs: React.ReactNode[] = [
          <MyCards />,
          <TodayCards />,
          <MyCollections />,
          <ExploreCommunity />,
          <MyBoxes />,
          <MyStatus />
     ];

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
                              {tabs.map((tab, index) => (
                                   <div key={index} onClick={handleClose}>
                                        {tab}
                                   </div>
                              ))}
                         </div>
                    </div>
               </Drawer>
          </div>
     );
}

export default MenuDrawer;