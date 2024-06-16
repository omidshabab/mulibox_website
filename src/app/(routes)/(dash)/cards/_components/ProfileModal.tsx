import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getUser } from "@/lib/auth/user";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const ProfileModal = () => {

     // const { session } = await getUser()

     return (
          <>
               <DialogHeader className="flex flex-col justify-center items-center text-center mb-[10px]">
                    <div className="w-[85px] h-[85px] rounded-full bg-primary/5 mb-[15px] cursor-pointer">

                    </div>

                    <DialogTitle className="text-[22px] text-text">
                         {/* {JSON.stringify(session?.user.name)} */}
                         Your Profile
                    </DialogTitle>
                    <DialogDescription className="text-[18px] font-normal text-slate-800 text-center line-clamp-3">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </DialogDescription>
               </DialogHeader>

               <DialogFooter className="flex items-center justify-center sm:justify-center">

                    <Button
                         onClick={() => signOut()}
                         variant="secondary"
                         className="flex gap-x-[10px] items-center text-[15px] font-medium">
                         <LogOutIcon className="w-[18px]" />
                         Logout Account
                    </Button>

               </DialogFooter>
          </>
     );
}

export default ProfileModal;