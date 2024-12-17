"use client"

import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Spacer } from "@nextui-org/react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CheckIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const features = [
     "Unlimited collections to make money",
     "Add and use unlimited cards and boxes",
     "Get professional status analytics",
     "Use AI to generate the back of cards",
]

const ProfileModal = ({
                           plan = "free",
                           model = "yearly"
                      }: {
     plan?: SubscriptionPlanType,
     model?: PriceModelType
}) => {
     const [isSigningOut, setIsSigningOut] = useState(false);
     const [userPlan, setUserPlan] = useState<SubscriptionPlanType | null>(null);
     const [userModel, setUserModel] = useState<PriceModelType>(model);

     const handleSignOut = async () => {
          setIsSigningOut(true);
          await signOut();
          setIsSigningOut(false);
     };

     const handleModelChange = (model: PriceModelType) => {
          setUserModel(model);
     };

     return (
         <ScrollArea className="max-h-[450px] sm:max-h-max">
              <div className="py-[30px]">
                   <VisuallyHidden.Root>
                        <DialogTitle />
                        <DialogDescription />
                   </VisuallyHidden.Root>

                   <DialogHeader className="flex flex-col justify-center items-center text-center mb-[30px]">
                        <div className="text-[22px] font-medium text-text">
                             Upgrade to Plus
                        </div>

                        <div className="text-[16px] font-extralight text-slate-600 text-center">
                             For comprehensive access and transform your memory experience
                        </div>

                        <div className="flex flex-col gap-y-[10px] w-full justify-start pt-[10px]">
                             {features.map((feature, index) => (
                                 <div key={index} className="flex items-center gap-x-[10px] text-[15px] text-start text-slate-800">
                                      <CheckIcon className="w-[20px] h-[20px] text-green-800 rounded-full p-[5px] bg-green-600/10" />
                                      {feature}
                                 </div>
                             ))}
                        </div>

                        <Spacer className="h-[20px]" />

                        <div className="flex flex-col w-full gap-y-[10px]">
                             <PriceModels type={userModel} onModelChange={handleModelChange} />
                        </div>
                   </DialogHeader>

                   <DialogFooter className="flex items-center justify-center sm:justify-center border-t-[2px] border-primary/5 pt-[25px]">
                        <div className="flex flex-col gap-y-[10px] w-full">
                             <div className="w-full rounded-[15px] font-medium text-[18px] bg-primary/5 text-center text-text py-[15px] px-[15px] hover:bg-primary/10 transition-all duration-500 cursor-pointer select-none">
                                  Upgrade Now
                             </div>

                             <div className="flex gap-x-[8px] justify-center text-[15px] text-slate-600 font-extralight text-center">
                                  <DialogClose>
                                <span className={cn(
                                    "hover:text-text cursor-pointer transition-all duration-500",
                                    isSigningOut && "opacity-50"
                                )}>
                                    keep using free plan
                                </span>
                                  </DialogClose>
                                  /
                                  <span className={cn(
                                      "hover:text-text cursor-pointer transition-all duration-500",
                                      isSigningOut && "opacity-50"
                                  )} onClick={() => !isSigningOut && handleSignOut()}>logout account</span>
                             </div>
                        </div>
                   </DialogFooter>
              </div>
         </ScrollArea>
     );
}

export default ProfileModal;

type SubscriptionPlanType = "free" | "plus";
type PriceModelType = "yearly" | "monthly";

type PriceModelItemType = {
     type: PriceModelType,
     title: string,
}

const models: PriceModelItemType[] = [
     {
          type: "yearly",
          title: "Yearly (10$/month)"
     },
     {
          type: "monthly",
          title: "Monthly (12$/month)"
     }
]

const PriceModels = ({
                          type = "monthly",
                          onModelChange
                     }: {
     type?: PriceModelType,
     onModelChange: (model: PriceModelType) => void
}) => {
     return models.map((model, index) => (
         <div
             key={index}
             onClick={() => onModelChange(model.type)}
             className={cn(
                 "flex justify-center items-center gap-x-[15px] w-full border-[1px] px-[20px] py-[15px] rounded-[20px] text-start select-none cursor-pointer transition-all duration-500",
                 model.type === type
                     ? "bg-primary/10 border-primary/20 text-primary/20"
                     : "border-primary/15 hover:bg-primary/5 hover:border-primary/10"
             )}
         >
              <div className={cn(
                  "flex w-[25px] h-auto aspect-square border-[2px] rounded-full",
                  model.type === type
                      ? "border-primary/20 bg-primary/5"
                      : "border-primary/10"
              )} />

              <div className="flex flex-col flex-grow w-full text-[15px] text-slate-800 font-light">
                   <div>
                        {model.title}
                   </div>

                   <div className="text-[13px] font-extralight text-slate-600">
                        Next billing will be on 20 Feb, 2024
                   </div>
              </div>
         </div>
     ));
}
