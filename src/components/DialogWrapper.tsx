import { PlusIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import IconButton from "./IconButton"
import ContentWrapper from "./ContentWrapper"

const DialogWrapper = ({
     title,
     subtitle,
     onClose,
     buttons,
     children
}: {
     title: string,
     subtitle?: string,
     onClose: () => void,
     buttons?: React.ReactNode
     children: React.ReactNode
}) => {
     return (
          <ContentWrapper>
               <div className="w-full">
                    <div className="flex justify-between items-center py-[25px] gap-x-[20px]">
                         <div className="flex flex-col sm:flex-row sm:items-center gap-x-[5px] text-[18px] text-text font-normal">
                              {title}
                              <div className="text-[15px] text-slate-600 font-extralight">
                                   / {subtitle}
                              </div>
                         </div>

                         <div className="flex gap-x-[10px]">
                              {buttons}

                              <div
                                   onClick={onClose}
                                   className="group/close-button flex flex-col justify-center items-center gap-y-[10px] text-center">
                                   <DialogPrimitive.Close className="focus:outline-none">
                                        <IconButton icon={X} />
                                   </DialogPrimitive.Close>
                              </div>
                         </div>
                    </div>

                    <div className="flex h-full">
                         {children}
                    </div>
               </div>
          </ContentWrapper>
     );
}

export default DialogWrapper;