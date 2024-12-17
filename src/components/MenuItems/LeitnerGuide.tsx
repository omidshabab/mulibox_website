"use client"

import { ChevronFirstIcon } from "lucide-react";
import MenuItem from "../MenuItem";
import { useRouter } from "next/navigation";
import { defaultRoutes } from "@/config/routes";

const LeitnerGuide = () => {
     const router = useRouter()

     return (
          <MenuItem
               icon={ChevronFirstIcon}
               text="leitner guide"
               onClick={() => router.push(defaultRoutes.guide)}
          />
     );
}

export default LeitnerGuide;