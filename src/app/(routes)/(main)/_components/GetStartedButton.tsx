import React from "react";
import { Button } from "@/components/ui/button"; import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


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
                    onClick={() => router.push("/register")}
                    className="flex w-min text-[30px] font-bold sm:py-[15px] sm:px-[30px] rounded-[15px] transform hover:-translate-y-1 transition duration-400 z-20"
                    variant="default">
                    {children}
               </Button>
          </div>
     );
}

export default GetStartedButton;