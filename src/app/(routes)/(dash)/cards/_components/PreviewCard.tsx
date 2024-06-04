import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowLeft, ArrowRight, CheckIcon, RefreshCwIcon, X } from "lucide-react";
import IconButton from "@/components/IconButton";
import { Delete, EditSquare } from "react-iconly";

const PreviewCard = ({
     content
}: {
     content: string
}) => {
     if (content) {
          return (
               <ContextMenu>
                    <ContextMenuTrigger>
                         <Dialog>
                              <DialogTrigger>
                                   <div className="bg-primary/5 border-[2px] border-primary/10 rounded-[15px] px-[20px] py-[15px] text-start hover:bg-primary/10 transition-all duration-500 cursor-pointer text-[18px] font-medium text-text">
                                        {content}
                                   </div>
                              </DialogTrigger>

                              <DialogPortal>
                                   <DialogOverlay />
                                   <DialogPrimitive.Content
                                        className="fixed left-[50%] top-[50%] z-50 grid w-full h-full translate-x-[-50%] translate-y-[-50%] duration-200">

                                        <div className="flex flex-col">
                                             <div className="flex justify-between md:justify-center px-[25px] py-[25px] gap-x-[10px]">
                                                  <DialogPrimitive.Close>
                                                       <IconButton icon={X} />
                                                  </DialogPrimitive.Close>

                                                  <IconButton icon={CheckIcon} />
                                             </div>

                                             <div className="flex flex-grow justify-center items-center">
                                                  <div className="flex flex-col gap-y-[30px] items-center justify-center">
                                                       <div className="w-[250px] h-[350px] bg-primary/5 rounded-[20px] border-[2px] border-primary/10 backdrop-blur-xl cursor-pointer">

                                                       </div>

                                                       <div className="text-text font-medium">
                                                            dolor sit amet consectetur
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className="flex justify-center px-[25px] py-[25px] gap-x-[10px]">
                                                  <IconButton icon={ArrowLeft} />

                                                  <IconButton icon={X} />

                                                  <IconButton icon={CheckIcon} />

                                                  <IconButton icon={ArrowRight} />
                                             </div>
                                        </div>
                                   </DialogPrimitive.Content>
                              </DialogPortal>
                         </Dialog>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-auto font-medium">
                         <ContextMenuItem className="flex gap-x-2 text-slate-800">
                              <EditSquare style={{ width: "16px", height: "16px" }} stroke="bold" />
                              Edit Card
                         </ContextMenuItem>
                         <ContextMenuItem className="flex gap-x-2 text-text">
                              <Delete style={{ width: "16px", height: "16px" }} stroke="bold" />
                              Delete
                         </ContextMenuItem>
                    </ContextMenuContent>
               </ContextMenu>
          );
     } else {
          return null
     }
}

export default PreviewCard;