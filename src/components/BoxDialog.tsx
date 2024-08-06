import {
     Dialog,
     DialogDescription,
     DialogOverlay,
     DialogPortal,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog";
import { useBoxDialog } from "@/hooks/use-dialog-store";
import { trpc } from "@/lib/trpc/client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Loader from "./Loader";
import BoxDialogContent from "./box/BoxDialogContent";

const BoxDialog = ({
     children
}: {
     children: React.ReactNode
}) => {
     const boxes = trpc.box.getBoxes.useQuery().data?.boxes;

     const isOpen = useBoxDialog((state) => state.isOpen)

     return (
          <Dialog open={isOpen}>
               <DialogTrigger asChild className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    {children}
               </DialogTrigger>

               <DialogPortal>
                    <VisuallyHidden.Root>
                         <DialogTitle />
                         <DialogDescription />
                    </VisuallyHidden.Root>

                    <DialogOverlay className="grid place-items-center overflow-auto backdrop-blur-md none-scroll-bar">
                         <DialogPrimitive.Content className="z-50 grid w-full h-full duration-200">
                              {boxes ? (
                                   <BoxDialogContent
                                        boxes={boxes} />
                              ) : (
                                   <Loader />
                              )}
                         </DialogPrimitive.Content>
                    </DialogOverlay>

               </DialogPortal>
          </Dialog>
     );
}

export default BoxDialog;