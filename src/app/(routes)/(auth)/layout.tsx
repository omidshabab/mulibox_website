import { dashRoutes } from "@/config/routes";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import React from "react"

export default async function layout({
     children
}: {
     children: React.ReactNode
}) {
     const session = await getUserAuth();
     if (session?.session) redirect(dashRoutes.default);

     return { children }
}