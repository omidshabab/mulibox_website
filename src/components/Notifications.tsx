// "use client"

// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
// import * as DialogPrimitive from "@radix-ui/react-dialog"
// import { X } from "lucide-react";
// import { Notification } from "react-iconly";
// import NotificationItem from "./Notification"
// import { ScrollArea } from "./ui/scroll-area";
// import { Button } from "./ui/button";
// import { useRef, useState, UIEvent, useEffect } from "react";
// import { cn } from "@/lib/utils";

// const Notifications = ({
//      isMobile = false
// }: {
//      isMobile?: boolean
// }) => {
//      const [showBorder, setShowBorder] = useState<boolean>(false)

//      const handleScroll = (event: UIEvent<HTMLDivElement>) => {
//           const target = event.currentTarget as HTMLDivElement;

//           if (target.scrollTop > 20) {
//                setShowBorder(true)
//           } else {
//                setShowBorder(false)
//           }
//      };

//      return (
//           <Dialog onOpenChange={() => setShowBorder(false)}>
//                <DialogTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
//                     {!isMobile ? (
//                          <div className="flex items-center justify-center text-text w-[40px] h-[40px] rounded-full bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all duration-500">
//                               <Notification stroke="bold" style={{ height: "20px" }} />
//                          </div>
//                     ) : (
//                          <Notification stroke="bold" style={{ height: "20px" }} />
//                     )}
//                </DialogTrigger>

//                <DialogContent className="max-w-[350px] sm:max-w-[400px] backdrop-blur-3xl px-[35px] py-[30px] gap-0">
//                     <DialogPrimitive.Close className="absolute flex p-2 h-[45px] w-[45px] backdrop-blur-xl items-center justify-center rounded-full border-[3px] border-border/10 cursor-pointer hover:bg-primary/5 text-text right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//                          <X className="h-6 w-6" />
//                          <span className="sr-only">Close</span>
//                     </DialogPrimitive.Close>

//                     <VisuallyHidden.Root>
//                          <DialogTitle />
//                          <DialogDescription />
//                     </VisuallyHidden.Root>

//                     <DialogHeader className={cn(
//                          "text-start pb-[20px] border-b-[2px] border-transparent",
//                          showBorder && "border-primary/5"
//                     )}>
//                          Notifications
//                     </DialogHeader>

//                     <div onScroll={handleScroll} className="max-h-[250px] overflow-y-scroll none-scroll-bar flex flex-col pb-[15px]">
//                          {[1, 2, 3, 4, 5].map((index) => (
//                               <NotificationItem key={index} />
//                          ))}
//                     </div>

//                     <DialogFooter className="flex items-end border-t-[2px] border-primary/5 pt-[15px]">
//                          <Button className="w-min text-[15px]" variant="secondary">
//                               mark all read
//                          </Button>
//                     </DialogFooter>
//                </DialogContent>
//           </Dialog>
//      );
// }

// export default Notifications;