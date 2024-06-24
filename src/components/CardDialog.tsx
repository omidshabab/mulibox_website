import {
     Dialog,
     DialogPortal,
     DialogTrigger,
} from "@/components/ui/dialog";
import CardDialogContent from "./card/CardDialogContent";

export default async function CardDialog({
     children
}: {
     children: React.ReactNode,
}) {
     return (
          <Dialog>
               <DialogTrigger asChild className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    {children}
               </DialogTrigger>

               <DialogPortal>
                    <CardDialogContent />
               </DialogPortal>
          </Dialog>
     );
}