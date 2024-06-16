"use client"

import { useSearchParams } from "next/navigation"
import AuthForm from "./_components/AuthForm"
import { RegisterStatus } from "@/types"
import AuthStatus from "./_components/AuthStatus"

const Page = () => {
     const searchParams = useSearchParams()
     const registerStatus = searchParams.get("status") as RegisterStatus

     return (
          <div className="w-full max-w-[600px] px-[30px] sm:px-0">
               {registerStatus === "error" && (
                    <AuthStatus status="error" />
               )}

               {registerStatus === "success" && (
                    <AuthStatus status="success" />
               )}

               {!registerStatus && (
                    <AuthForm />
               )}
          </div>
     );
}

export default Page;