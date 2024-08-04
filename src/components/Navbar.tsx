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

const Navbar = async ({
     dir
}: {
     dir?: "ltr" | "rtl"
}) => {
     const tGeneral = await getTranslations("general")

     return (
          <div className="flex w-full h-[80px] gap-x-[15px] justify-between items-center py-[18px] border-primary/5 border-b-[2px]">
               <div className="flex gap-x-5 items-center">
                    <div className="flex w-min min-w-[35px] sm:w-auto sm:min-w-auto gap-x-[10px] items-center justify-start">
                         <Link
                              href={defaultRoutes.default}
                              className="flex items-center gap-x-[15px] font-medium text-text">
                              {/* <Image
                                   width={32}
                                   height={32}
                                   src="/images/logo-64x64.png"
                                   alt="logo"
                                   className="w-[32px] h-[32px] aspect-square cursor-pointer" /> */}

                              <div className="flex gap-x-[5px]">{tGeneral("mulibox")}<span className="hidden sm:block font-light text-slate-600">/ {tGeneral("software")}</span></div>
                         </Link>
                    </div>

                    <div className="hidden sm:flex gap-x-[20px] items-center text-[15px]">
                         <Menu dir={dir} />
                    </div>
               </div>

               <div className="hidden md:flex gap-x-[10px] items-center">
                    <div className="flex gap-x-[20px]">
                         <ChangeLanguage />
                    </div>

                    <Spacer x={2} />

                    <AddNewCard />

                    <ProfileAvatar />
               </div>

               <div className="flex gap-x-[10px] md:hidden">
                    <ChangeLanguage />

                    <ProfileAvatar isMobile />

                    <MenuDrawer />
               </div>
          </div>
     );
}

export default Navbar;