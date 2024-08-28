"use client"

import {Container} from "@/components/craft";
import {HeartIcon, UserIcon, BookmarkIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {defaultRoutes} from "@/config/routes";
import {Squircle} from "corner-smoothing";
import {motion} from "framer-motion";
import ReadMore from "@/components/ReadMore";
import {useTranslations} from "next-intl";

const Page = () => {
    const tGeneral = useTranslations("general")

     return (
          <Container>
               <div className="flex w-full py-[50px]">
                   <div className="flex flex-col gap-y-[15px] w-full justify-center">
                       {/* <div className="flex items-center gap-x-[15px] text-zinc-600">
    <div className="w-[45px] h-[45px] aspect-square rounded-full bg-primary/[3%]">

    </div>
    mulibox.
</div> */}

                       Agency Pitch

                       <div className="flex gap-x-[10px] text-[15px] text-zinc-600">
                           <div>
                               mulibox
                           </div>

                           ·

                           <div className="flex items-center gap-x-[5px]">
                               <HeartIcon className="w-auto h-[15px] text-zinc-600"/>
                               619
                           </div>

                           ·

                           <div className="flex items-center gap-x-[5px]">
                               <UserIcon className="w-auto h-[15px] text-zinc-600"/>
                               23.7k users
                           </div>
                       </div>

                       <div className="flex gap-x-[15px] h-[40px] mt-[25px]">
                           <Button
                               variant="secondary"
                               className="flex text-[12px] sm:text-[14px] gap-x-[5px] font-normal">
                               Use Collection
                           </Button>

                           <div className="flex gap-x-[5px]">
                               <div
                                   className="flex aspect-square justify-center items-center p-[8px] border-[2px] border-primary/5 rounded-full cursor-pointer">
                                   <HeartIcon className="text-text opacity-50 w-[20px]"/>
                               </div>

                               <div
                                   className="flex aspect-square justify-center items-center p-[8px] border-[2px] border-primary/5 rounded-full cursor-pointer">
                                   <BookmarkIcon className="text-text opacity-50 w-[20px]"/>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div className="w-full flex-grow aspect-square">
                       <div className="flex flex-col gap-y-[10px] cursor-pointer select-none">

                       </div>
                   </div>
               </div>

              <div className="w-full py-[15px] border-b-[1px] border-zinc-900/5">
<div className="flex gap-x-[15px] text-zinc-600">
    <div className="cursor-pointer">
        About
    </div>

    <div className="flex gap-x-[5px] justify-center items-center cursor-pointer">
        Comments
        <span className="text-zinc-500"> / 15 </span>
    </div>
</div>
                  </div>

              <div className="flex flex-grow gap-x-[15px]">
                  <div className="flex flex-col py-[20px]">
                      <ReadMore text={tGeneral("lorem").repeat(5)} />
                  </div>

                  <div className="flex flex-col gap-y-[30px] min-w-[250px] py-[20px]">
                      <div className="flex flex-col gap-y-[10px] text-zinc-800">
                          Category
                          <div className="flex w-full gap-x-[8px]">
                              {["education", "marketing"].map((category, index) => (
                                  <div
                                      key={index}
                                      className="rounded-full border-[1px] border-zinc-600/5 text-zinc-600 text-[15px] px-[10px] py-[2px] hover:bg-primary/[3%] hover:border-primary/5 text-text cursor-pointer transition-all duration-500 font-extralight">
                                      {category}
                                  </div>
                              ))}
                          </div>
                      </div>

                      <div className="flex flex-col gap-y-[10px] text-zinc-800">
                          Share
                          <div className="flex w-full gap-x-[8px]">

                          </div>
                      </div>
                  </div>
              </div>
          </Container>
     );
}

export default Page;