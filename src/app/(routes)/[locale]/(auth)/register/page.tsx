"use client"

import { useSearchParams } from "next/navigation"
import AuthForm from "./_components/AuthForm"
import { RegisterStatus } from "@/types"
import React, {useEffect} from "react"
import {toast} from "sonner"

const Page = () => {
     const searchParams = useSearchParams()
     const registerStatus = searchParams.get("status") as RegisterStatus
     const error = searchParams.get("error")

     const toastShownRef = React.useRef(false);

     useEffect(() => {
          if (error && !toastShownRef.current) {
               toast.error(`${error} error`, { duration: Infinity, closeButton: true });
               toastShownRef.current = true;
          }
     }, [error]);

     return (
          <div className="w-full h-full max-w-[600px] px-[30px] sm:px-0 flex justify-center items-center overflow-y-auto flex-col">
               <div className="h-full overflow-y-auto none-scroll-bar flex flex-col">
                         <AuthForm />
                    </div>
          </div>
     );
}

export default Page;