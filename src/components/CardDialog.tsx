import {
     Dialog,
     DialogDescription,
     DialogPortal,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog";
import CardDialogContent from "./card/CardDialogContent";
import { trpc } from "@/lib/trpc/client";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { CardListFilter } from "@/lib/cards";

const CardDialog = ({
     children,
}: {
     children: React.ReactNode,
}) => {
     const cards = trpc.cards.getCards.useQuery().data?.cards ?? [];

     return (
          <Dialog>
               <DialogTrigger asChild className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    {children}
               </DialogTrigger>

               <DialogPortal>
                    <VisuallyHidden.Root>
                         <DialogTitle />
                         <DialogDescription />
                    </VisuallyHidden.Root>
                    <CardDialogContent
                         cards={cards}
                         type={CardListFilter.all}
                         index={cards.length - 1} />
               </DialogPortal>
          </Dialog>
     );
}

export default CardDialog