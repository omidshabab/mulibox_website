import React from "react";
import { Button } from "@/components/ui/button"; import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { authRoutes } from "@/config/routes";


const GetStartedButton = ({
     children
}: {
     children: React.ReactNode
}) => {
     const router = useRouter()

     return (
          <div
               className={cn("relative")}>
               <Button
                    onClick={() => router.push(authRoutes.default)}
                    className="flex w-min text-[20px] md:text-[30px] font-bold px-[20px] py-[25px] md:py-[35px] md:px-[30px] rounded-[12px] md:rounded-[15px] transform hover:-translate-y-1 transition duration-400 z-20"
                    variant="default">
                    {children}
               </Button>
          </div>
     );
}

export default GetStartedButton;