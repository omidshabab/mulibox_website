import { checkAuth } from "@/lib/auth/utils";
import React from "react"

export default async function layout({
     children
}: {
     children: React.ReactNode,
}) {
     await checkAuth();

     return children
}