import {
     Dialog,
     DialogDescription,
     DialogOverlay,
     DialogPortal,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog";
import CardDialogContent from "./card/CardDialogContent";
import { trpc } from "@/lib/trpc/client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { CardListFilter } from "@/lib/cards";
import { useCardDialog } from "@/hooks/use-card-dialog-store";
import Loader from "./Loader";

const CardDialog = ({
     children,
}: {
     children: React.ReactNode,
}) => {
     const cards = trpc.cards.getCards.useQuery().data?.cards;

     const isOpen = useCardDialog((state) => state.isOpen)

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

                    <DialogOverlay />
                    <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full h-full translate-x-[-50%] translate-y-[-50%] duration-200">
                         {cards ? (
                              <CardDialogContent
                                   cards={cards}
                                   type={CardListFilter.all}
                                   index={cards.length - 1} />
                         ) : (
                              <Loader />
                         )}
                    </DialogPrimitive.Content>

               </DialogPortal>
          </Dialog>
     );
}

export default CardDialog