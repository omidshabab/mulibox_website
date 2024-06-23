import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import ProfileModal from "./ProfileModal";
import { getUser } from "@/lib/auth/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const ProfileAvatar = async () => {
     const { session } = await getUser()

     const user = session?.user;

     if (!user?.name || user.name.length == 0) return null;

     return (
          <Dialog>
               <DialogTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    <div className="w-[40px] h-[40px] rounded-full bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all duration-500">
                         <Avatar>
                              <AvatarFallback className="text-text bg-transparent font-semibold">
                                   <User className="h-[20px]" />
                              </AvatarFallback>
                         </Avatar>
                    </div>
               </DialogTrigger>

               <DialogContent className="max-w-[250px] backdrop-blur-3xl">
                    <ProfileModal
                         title={user.name}
                         image={user.image} />
               </DialogContent>
          </Dialog>
     );
}

export default ProfileAvatar;