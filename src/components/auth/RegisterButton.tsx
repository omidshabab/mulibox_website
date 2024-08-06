"use client";

import { Button } from "@/components/ui/button";
import { authRoutes } from "@/config/routes";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter()

  return (
    <Button
      variant="secondary"
      onClick={() => router.push(authRoutes.default)}
      className="flex text-[12px] sm:text-[14px] gap-x-[5px] font-normal">
      Register to Account
    </Button>
  );
}
