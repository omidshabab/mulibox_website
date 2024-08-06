import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";
import AddNewCard from "@/components/AddNewCard";
import { Spacer } from "@nextui-org/react";
import MenuDrawer from "./MenuDrawer";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { defaultRoutes } from "@/config/routes";
import Menu from "./Menu";
import ChangeLanguage from "./ChangeLanguage";
import { cn } from "@/lib/utils";
import RegisterButton from "./auth/RegisterButton";
import Notifications from "./Notifications";

export type NavbarType = "default" | "guide" | "community" | "dash"

const Navbar = async ({
     dir,
     type = "default"
}: {
     dir?: "ltr" | "rtl",
     type?: NavbarType
}) => {
     const tGeneral = await getTranslations("general")

     return (
          <div className={cn(
               "flex w-full h-[80px] gap-x-[15px] justify-between items-center py-[18px] border-primary/5",
               type === "dash" && "border-b-[2px]"
          )}>
               <div className="flex gap-x-5 items-center">
                    <div className="flex w-min min-w-[35px] sm:w-auto sm:min-w-auto gap-x-[10px] items-center justify-start">
                         <Link
                              href={defaultRoutes.default}
                              className="flex items-center gap-x-[15px] font-medium text-text">
                              {(type === "default" || type === "guide" || type === "community") && (
                                   <Image
                                        width={32}
                                        height={32}
                                        src="/images/logo-64x64.png"
                                        alt="logo"
                                        className="w-[32px] h-[32px] aspect-square cursor-pointer" />
                              )}

                              <div className="flex gap-x-[5px]">{tGeneral("mulibox")}<span className="hidden sm:block font-light text-slate-600">/ {tGeneral("software")}</span></div>
                         </Link>
                    </div>

                    <div className="hidden sm:flex gap-x-[20px] items-center text-[15px]">
                         <Menu type={type} dir={dir} />
                    </div>
               </div>

               <div className="hidden md:flex gap-x-[10px] items-center">
                    <div className="flex gap-x-[20px]">
                         {!(type === "default") && (
                              <>
                                   <ChangeLanguage />
                              </>
                         )}
                    </div>

                    {type === "dash" && (
                         <>
                              <Spacer x={2} />

                              <AddNewCard />

                              <Notifications />

                              <ProfileAvatar />
                         </>
                    )}

                    {type === "default" && (
                         <>
                              <RegisterButton />
                         </>
                    )}
               </div>

               <div className="flex gap-x-[10px] md:hidden">
                    <ChangeLanguage />

                    {type === "dash" && (
                         <>
                              <Notifications isMobile />

                              <ProfileAvatar isMobile />
                         </>
                    )}

                    <MenuDrawer />
               </div>
          </div>
     );
}

export default Navbar;