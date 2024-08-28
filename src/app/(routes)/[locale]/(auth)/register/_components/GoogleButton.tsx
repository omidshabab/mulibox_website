import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/components/icons/Google";

const GoogleButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className={cn("relative")}>
      <Button
        onClick={onClick}
        disabled={disabled}
        size="lg"
        className="flex gap-2 w-min font-bold px-[20px] py-[25px] sm:px-[25px] sm:py-[30px] rounded-[12px] transform hover:-translate-y-1"
        variant="cta_outline"
      >
        <GoogleIcon className="aspect-square h-4 sm:h-6" />
        {children}
      </Button>
    </div>
  );
};

export default GoogleButton;
