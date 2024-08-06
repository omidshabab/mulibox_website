import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProfileModal from "./ProfileModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const ProfileAvatar = async ({
     isMobile = false
}: {
     isMobile?: boolean
}) => {
     return (
          <Dialog>
               <DialogTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    {!isMobile ? (
                         <div className="w-[40px] h-[40px] rounded-full bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all duration-500">
                              <Avatar>
                                   <AvatarFallback className="text-text bg-transparent font-semibold">
                                        <User className="h-[20px]" />
                                   </AvatarFallback>
                              </Avatar>
                         </div>
                    ) : (
                         <User className="h-[20px]" />
                    )}
               </DialogTrigger>

               <DialogContent className="max-w-[350px] sm:max-w-[450px] backdrop-blur-3xl px-[35px] py-0">
                    <ProfileModal />
               </DialogContent>
          </Dialog>
     );
}

export default ProfileAvatar;