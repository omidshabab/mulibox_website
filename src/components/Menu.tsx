import { defaultRoutes } from "@/config/routes";
import {
     NavigationMenu,
     NavigationMenuContent,
     NavigationMenuItem,
     NavigationMenuLink,
     NavigationMenuList,
     NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";
import MyCards from "./MenuItems/MyCards";
import TodayCards from "./MenuItems/TodayCards";
import MyCollections from "./MenuItems/MyCollections";
import ExploreCommunity from "./MenuItems/ExploreCommunity";
import MyStatus from "./MenuItems/MyStatus";
import MyBoxes from "./MenuItems/MyBoxes";

const Menu = ({
     dir = "ltr"
}: {
     dir?: "rtl" | "ltr"
}) => {
     const tGeneral = useTranslations("general");
     const tMenu = useTranslations("menu");

     const tabs: React.ReactNode[] = [
          <MyCards />,
          <TodayCards />,
          <MyCollections />,
          <ExploreCommunity />,
          <MyBoxes />,
          <MyStatus />
     ];

     return (
          <NavigationMenu dir={dir}>
               <NavigationMenuList>
                    <NavigationMenuItem>
                         <NavigationMenuTrigger className="cursor-pointer">{tGeneral("menu")}</NavigationMenuTrigger>
                         <NavigationMenuContent>
                              <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[300px] rtl:grid-rtl">
                                   {tabs.map((tab, index) => (
                                        <ListItem
                                             key={index}
                                             className="cursor-pointer">
                                             {tab}
                                        </ListItem>
                                   ))}
                              </ul>
                         </NavigationMenuContent>
                    </NavigationMenuItem>
               </NavigationMenuList>
          </NavigationMenu>
     );
}

export default Menu;

const ListItem = React.forwardRef<
     React.ElementRef<"a">,
     React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
     return (
          <li>
               <NavigationMenuLink asChild>
                    <a
                         ref={ref}
                         className={cn(
                              "block select-none space-y-[8px] leading-none no-underline outline-none transition-colors",
                              className
                         )}
                         {...props}>
                         {children}
                    </a>
               </NavigationMenuLink>
          </li>
     )
})
ListItem.displayName = "ListItem"
