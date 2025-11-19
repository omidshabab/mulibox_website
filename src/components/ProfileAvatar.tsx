"use client"

import { Dialog, DialogContent, DialogTrigger, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { useState } from "react";
import { signOut } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { authRoutes } from "@/config/routes";
import { toast } from "sonner";

const ProfileAvatar = ({
    isMobile = false
}: {
    isMobile?: boolean
}) => {
    const [isSigningOut, setIsSigningOut] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut();
            router.replace(authRoutes.default);
            router.refresh();
        } catch (error) {
            toast.error("Unable to log out. Please try again.");
            console.error(error);
        } finally {
            setIsSigningOut(false);
        }
    };

    const user = trpc.account.getUser.useQuery().data?.user;

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

            {/*   <DialogContent className="max-w-[350px] sm:max-w-[450px] backdrop-blur-3xl px-[35px] py-0">
              c      <ProfileModal />
               </DialogContent> */}

            <DialogContent className="rounded-[30px] max-w-[400px] backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-[22px] mr-[35px] font-bold text-text text-start">
                        {user && user.name && `Hey ${user?.name}, `}Do you really want to logout?
                    </DialogTitle>
                    <DialogDescription className="text-[18px] text-text/80 text-start">
                        Let me know that your really want to logout or not
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-row w-full justify-end items-center gap-2 mt-[15px]">
                        <Button
                            variant="secondary"
                            disabled={isSigningOut}
                            onClick={() => handleSignOut()}>
                            Yes, Logout!
                        </Button>

                        <DialogClose>
                            <Button
                                variant="outline"
                                disabled={isSigningOut}
                                className="text">
                                Cancel
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>

                <DialogPrimitive.Close className="absolute flex p-2 h-[45px] w-[45px] backdrop-blur-xl items-center justify-center rounded-full border-[3px] border-border/10 cursor-pointer hover:bg-primary/5 text-text right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileAvatar;