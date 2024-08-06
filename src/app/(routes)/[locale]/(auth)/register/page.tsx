"use client"

import { useSearchParams } from "next/navigation"
import AuthForm from "./_components/AuthForm"
import { RegisterStatus } from "@/types"
import AuthStatus from "./_components/AuthStatus"

const Page = () => {
     const searchParams = useSearchParams()
     const registerStatus = searchParams.get("status") as RegisterStatus
     const error = searchParams.get("error")

     return (
          <div className="w-full h-full max-w-[600px] px-[30px] sm:px-0 flex justify-center items-center overflow-y-auto flex-col">
               {error && (
                    <div>
                         {error}
                    </div>
               )}

               {registerStatus === "error" && (
                    <AuthStatus status="error" />
               )}

               {registerStatus === "success" && (
                    <AuthStatus status="success" />
               )}

               {!registerStatus && !error && (
                    <div className="h-full overflow-y-auto none-scroll-bar flex flex-col">
                         <AuthForm />
                    </div>
               )}
          </div>
     );
}

export default Page;