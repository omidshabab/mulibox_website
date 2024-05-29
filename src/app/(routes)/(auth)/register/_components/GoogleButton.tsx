import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/components/icons/Google";

const GoogleButton = ({
     children,
     disabled,
     onClick,
}: {
     children: React.ReactNode,
     disabled?: boolean,
     onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => {

     return (
          <div
               className={cn("relative")}>
               <Button
                    size="lg"
                    onClick={onClick}
                    disabled={disabled}
                    className="flex gap-2 w-min text-[20px] font-bold py-[30px] px-[25px] rounded-[12px] transform hover:-translate-y-1 transition duration-400 z-20"
                    variant="outline">
                    <GoogleIcon
                         className="h-6 aspect-square" />
                    {children}
               </Button>
          </div>
     );
}

export default GoogleButton;