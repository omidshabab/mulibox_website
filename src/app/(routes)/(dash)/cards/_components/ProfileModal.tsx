"use client"

import IconButton from "@/components/IconButton";
import GoogleIcon from "@/components/icons/Google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spacer } from "@nextui-org/react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CheckIcon, LogOutIcon, User, UserCheckIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const features = [
     "Unlimited Completion Guide",
     "Personalized recommendations",
     "Advanced analytics",
     "Access to exclusive offers",
]

const ProfileModal = ({
     title,
     image,
}: {
     title?: string
     image?: string
}) => {
     return (
          <>
               <VisuallyHidden.Root>
                    <DialogTitle />
                    <DialogDescription />
               </VisuallyHidden.Root>

               <DialogHeader className="flex flex-col justify-center items-center text-center mb-[10px]">
                    <div className="text-[22px] font-medium text-text">
                         Upgrade to Plus
                    </div>

                    <div className="text-[16px] font-extralight text-slate-600 text-center">
                         for comprehensive access and transform your memory experience
                    </div>

                    <div className="flex flex-col gap-y-[10px] w-full justify-start pt-[10px]">
                         {features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-x-[10px] text-[15px] text-start text-slate-800">
                                   <CheckIcon className="w-[20px] h-[20px] text-green-800 rounded-full p-[5px] bg-green-600/10" />
                                   {feature}
                              </div>
                         ))}
                    </div>

                    <Spacer className="h-[20px]" />

                    <div className="flex flex-col w-full gap-y-[10px]">
                         <div className="flex justify-center items-center gap-x-[15px] w-full border-[1px] border-primary/15 px-[20px] py-[15px] rounded-[20px] text-start select-none cursor-pointer hover:bg-primary/5 hover:border-primary/10 transition-all duration-500">
                              <div className="flex w-[25px] h-auto aspect-square border-[2px] border-primary/10 rounded-full">

                              </div>

                              <div className="flex flex-col flex-grow w-full text-[15px] text-slate-800 font-light">
                                   <div>
                                        Yearly (10$/month)
                                   </div>

                                   <div className="text-[13px] font-extralight text-slate-600">
                                        Next billing will on 20 Feb, 2024
                                   </div>
                              </div>
                         </div>

                         <div className="flex justify-center items-center gap-x-[15px] w-full border-[1px] border-primary/15 px-[20px] py-[15px] rounded-[20px] text-start select-none cursor-pointer hover:bg-primary/5 hover:border-primary/10 transition-all duration-500">
                              <div className="flex w-[25px] h-auto aspect-square border-[2px] border-primary/10 rounded-full">

                              </div>

                              <div className="flex flex-col flex-grow w-full text-[15px] text-slate-800 font-light">
                                   <div>
                                        Monthly (12$/month)
                                   </div>

                                   <div className="text-[13px] font-extralight text-slate-600">
                                        Next billing will on 20 Feb, 2024
                                   </div>
                              </div>
                         </div>
                    </div>
               </DialogHeader>

               <DialogFooter className="flex items-center justify-center sm:justify-center border-t-[2px] border-primary/5 pt-[25px]">
                    <div className="flex flex-col gap-y-[10px] w-full">
                         <div className="w-full rounded-[15px] font-medium text-[18px] bg-primary/5 text-center text-text py-[15px] px-[15px] hover:bg-primary/10 transition-all duration-500 cursor-pointer">
                              Upgrade Now
                         </div>

                         <div className="text-[15px] text-slate-600 font-extralight text-center">
                              keep using free plan / logout account
                         </div>
                    </div>
               </DialogFooter>
          </>
     );
}

export default ProfileModal;