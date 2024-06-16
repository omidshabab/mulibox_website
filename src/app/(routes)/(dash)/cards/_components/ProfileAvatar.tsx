import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import ProfileModal from "./ProfileModal";
import * as DialogPrimitive from "@radix-ui/react-dialog"

const ProfileAvatar = () => {
     return (
          <Dialog>
               <DialogTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    <div className="w-[40px] h-[40px] rounded-full bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all duration-500">

                    </div>
               </DialogTrigger>

               <DialogContent className="max-w-[250px]">
                    <ProfileModal />
               </DialogContent>
          </Dialog>
     );
}

export default ProfileAvatar;