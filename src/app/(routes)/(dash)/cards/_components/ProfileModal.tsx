"use client"

import IconButton from "@/components/IconButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LogOutIcon, User } from "lucide-react";
import { signOut } from "next-auth/react";

const ProfileModal = ({
     title,
     image,
}: {
     title?: string
     image?: string
}) => {
     return (
          <>
               <DialogHeader className="flex flex-col justify-center items-center text-center mb-[10px]">
                    <div className="w-[85px] h-[85px] rounded-full bg-primary/5 mb-[15px] cursor-pointer">
                         <Avatar className="flex justify-center items-center w-full h-full">
                              {image && <AvatarImage src={image} />}
                              <AvatarFallback className="text-text bg-transparent font-semibold">
                                   <User size={50} className="opacity-20" />
                              </AvatarFallback>
                         </Avatar>
                    </div>

                    <DialogTitle className="text-[22px] text-text">
                         {title ?? "Your Profile"}
                    </DialogTitle>
                    <DialogDescription className="text-[18px] font-normal text-slate-800 text-center line-clamp-3">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </DialogDescription>
               </DialogHeader>

               <DialogFooter className="flex items-center justify-center sm:justify-center">

                    <IconButton
                         onClick={() => signOut()}
                         icon={LogOutIcon} />

               </DialogFooter>
          </>
     );
}

export default ProfileModal;