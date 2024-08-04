"use client"

import { ChevronFirstIcon } from "lucide-react";
import MenuItem from "../MenuItem";
import { useRouter } from "next/navigation";
import { defaultRoutes } from "@/config/routes";

const ExploreCommunity = () => {
     const router = useRouter()

     return (
          <MenuItem
               icon={ChevronFirstIcon}
               text="explore commununity"
               onClick={() => router.push(defaultRoutes.community)}
          />
     );
}

export default ExploreCommunity;