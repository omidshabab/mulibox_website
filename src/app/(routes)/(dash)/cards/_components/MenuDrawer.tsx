import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
     Drawer,
     DrawerClose,
     DrawerContent,
     DrawerDescription,
     DrawerFooter,
     DrawerHeader,
     DrawerTitle,
     DrawerTrigger,
} from "@/components/ui/drawer"
import MenuIcon from "@/components/icons/Menu"

const MenuDrawer = () => {
     return (
          <Drawer>
               <DrawerTrigger asChild>
                    <MenuIcon className="w-[25px]" />
               </DrawerTrigger>
               <DrawerContent>
                    <div className="mx-auto w-full max-w-sm px-[25px] py-[20px]">
                         <div className="text-text text-[18px] font-medium text-center">
                              Lorem ipsum
                         </div>
                    </div>
               </DrawerContent>
          </Drawer>
     );
}

export default MenuDrawer;