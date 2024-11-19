"use client"

import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";
import AddNewCard from "@/components/AddNewCard";
import { Spacer } from "@nextui-org/react";
import MenuDrawer from "./MenuDrawer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { authRoutes, defaultRoutes } from "@/config/routes";
import Menu from "./Menu";
// import ChangeLanguage from "./ChangeLanguage";
import { cn } from "@/lib/utils";
import RegisterButton from "./auth/RegisterButton";
import { Container } from "./craft";
import { BoxIcon } from "lucide-react";
import { useRouter } from "next/navigation";
// import Notifications from "./Notifications";

export type NavbarType = "default" | "guide" | "community" | "dash";

const Navbar = ({
  dir,
  type = "default",
}: {
  dir?: "ltr" | "rtl";
  type?: NavbarType;
}) => {
  const router = useRouter()

  const tGeneral = useTranslations("general");

  return (
    <>
      {type === "dash" && (
        <div className={cn(
          "flex w-full h-[80px] gap-x-[15px] justify-between items-center py-[18px] border-primary/5",
          type === "dash" && "border-b-[2px]"
        )}>
          <div className="flex gap-x-5 items-center">
            <div className="flex w-min min-w-[35px] sm:w-auto sm:min-w-auto gap-x-[10px] items-center justify-start">
              <Link
                href={defaultRoutes.default}
                className="flex items-center gap-x-[15px] font-medium text-text">
                {/* {(type === "default" || type === "guide" || type === "community") && (
                        <Image
                             width={32}
                             height={32}
                             src="/images/logo-64x64.png"
                             alt="logo"
                             className="w-[32px] h-[32px] aspect-square cursor-pointer" />
                   )} */}

                <div className="flex gap-x-[5px]">{tGeneral("mulibox")}<span className="hidden sm:block font-light text-slate-600">/ {tGeneral("software")}</span></div>
              </Link>
            </div>

            <div className="hidden sm:flex gap-x-[20px] items-center text-[15px]">
              <Menu type={type} dir={dir} />
            </div>
          </div>

          <div className="hidden md:flex gap-x-[10px] items-center">
            <div className="flex gap-x-[20px]">
              {/* {!(type === "default") && (
                   <>
                        <ChangeLanguage />
                   </>
              )} */}
            </div>

            {type === "dash" && (
              <>
                <Spacer x={2} />

                <AddNewCard />

                {/* <Notifications /> */}

                <ProfileAvatar />
              </>
            )}

            {/* {type === "default" && (
              <>
                   <RegisterButton />
              </>
         )} */}
          </div>

          <div className="flex gap-x-[10px] md:hidden">
            {/* <ChangeLanguage /> */}

            {type === "dash" && (
              <>
                {/* <Notifications isMobile /> */}

                <ProfileAvatar isMobile />
              </>
            )}

            <MenuDrawer />
          </div>
        </div>
      )}

      {type !== "dash" && (
        <Container>
          <div className="flex w-full justify-center items-center pt-[20px]">
            <div className="flex items-center rounded-full min-w-[380px] bg-transparent backdrop-blur-sm border-primary/5 border-[1px] px-[20px] py-[15px]">
              <div className="flex flex-grow items-center gap-x-[20px]">
                <div
                  onClick={() => router.push(defaultRoutes.default)}
                  className="flex gap-x-[5px] cursor-pointer">
                  <BoxIcon className="text-primary opacity-10 font-extralight" /> <span className="bg-gradient-to-b from-orange-400 to-orange-800 inline-block text-transparent bg-clip-text">/</span>
                  <div className="bg-gradient-to-b from-orange-400 to-orange-800 inline-block text-transparent bg-clip-text">
                    mulibox.
                  </div>
                </div>

                <Menu />
              </div>

              <div
                onClick={() => router.push(authRoutes.default)}
                className="text-[15px] text-slate-600 px-[15px] py-[6px] rounded-full border-[1px] border-primary/5 cursor-pointer">
                register
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Navbar;
