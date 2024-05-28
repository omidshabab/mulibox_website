"use client"

import { signIn } from "next-auth/react";
import { dashRoutes } from "@/config/routes";

const Page = () => {
     return (
          <div onClick={() => signIn("google", {
               callbackUrl: dashRoutes.default,
          })}>
               Page
          </div>
     );
}

export default Page;