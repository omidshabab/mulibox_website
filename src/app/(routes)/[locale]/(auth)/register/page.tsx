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
          <div className="w-full max-w-[600px] px-[30px] sm:px-0 flex justify-center items-center">
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
                    <AuthForm />
               )}
          </div>
     );
}

export default Page;