import {
     Dialog,
     DialogPortal,
     DialogTrigger,
} from "@/components/ui/dialog";
import CardDialogContent from "./card/CardDialogContent";
import { trpc } from "@/lib/trpc/client";

const CardDialog = ({
     children
}: {
     children: React.ReactNode,
}) => {
     const cards = trpc.cards.getCards.useQuery().data?.cards;

     return (
          <Dialog>
               <DialogTrigger asChild className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    {children}
               </DialogTrigger>

               <DialogPortal>
                    <CardDialogContent cards={cards} />
               </DialogPortal>
          </Dialog>
     );
}

export default CardDialog