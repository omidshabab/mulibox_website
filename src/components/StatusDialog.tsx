import {
     Dialog,
     DialogDescription,
     DialogOverlay,
     DialogPortal,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog";
import { useStatusDialog } from "@/hooks/use-dialog-store";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import StatusDialogContent from "./status/StatusDialogContent";

const StatusDialog = ({
     children
}: {
     children: React.ReactNode
}) => {
     const isOpen = useStatusDialog((state) => state.isOpen)

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

                    <DialogOverlay className="backdrop-blur-md" />
                    <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full h-full translate-x-[-50%] translate-y-[-50%] duration-200">
                         <StatusDialogContent />
                    </DialogPrimitive.Content>

               </DialogPortal>
          </Dialog>
     );
}

export default StatusDialog;