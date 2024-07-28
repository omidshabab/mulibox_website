"use client"

import { Button } from "@/components/ui/button";
import { Plus, PlusIcon } from "lucide-react";
import IconButton from "./IconButton";
import { toast } from "sonner";
import { Card, NewCardParams } from "@/lib/db/schema/cards";
import { trpc } from "@/lib/trpc/client";
import { useCardDialog } from "@/hooks/use-card-dialog-store";

type AddCardButtonType = "default" | "icon"

const AddNewCard = ({
     type = "default"
}: {
     type?: AddCardButtonType
}) => {
     const setCardDialogOpen = useCardDialog((state) => state.setOpen)

     const collection = trpc.collections.getCollection.useQuery().data?.collection;

     const utils = trpc.useUtils();

     const onSuccess = async (action: "create" | "update" | "delete", data?: { error?: string, card: Card }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          await utils.cards.getCards.invalidate();
     };

     const onError = async (action: "create" | "update" | "delete", data?: { error?: string }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          toast.error(`Card ${action} failed!`);
     };

     const { mutate: createCard, isLoading: isCreating } = trpc.cards.createCard.useMutation({
          onSuccess: (data) => onSuccess("create", data),
          onError: (err) => onError("create", { error: err.message }),
     });

     const handleAddCard = async () => {
          if (collection) {
               const newCardParams: NewCardParams = { front: "", back: "", collectionId: collection.id }

               createCard(newCardParams);
          }
     };

     return (
          <div onClick={() => setCardDialogOpen()}>
               {type === "icon" && (
                    <IconButton
                         onClick={() => handleAddCard()}
                         icon={PlusIcon} />
               )}

               {type === "default" && (
                    <Button
                         variant="secondary"
                         onClick={() => handleAddCard()}
                         className="flex text-[12px] sm:text-[14px] gap-x-[5px] font-semibold">
                         Add New Card
                         <Plus className="w-[15px] h-[15px]" />
                    </Button>
               )}
          </div>
     );
}

export default AddNewCard;