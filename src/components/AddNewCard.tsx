"use client"

import { Button } from "@/components/ui/button";
import { Plus, PlusIcon } from "lucide-react";
import CardDialog from "./CardDialog";
import IconButton from "./IconButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, NewCardParams } from "@/lib/db/schema/cards";
import { trpc } from "@/lib/trpc/client";

type AddCardButtonType = "default" | "icon"

const AddNewCard = ({
     type = "default"
}: {
     type?: AddCardButtonType
}) => {
     const utils = trpc.useUtils();

     const onSuccess = async (action: "create" | "update" | "delete", data?: { error?: string, card: Card }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          await utils.cards.getCards.invalidate();

          toast.success(`Card ${action}d!`);
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

     const { mutate: updateCard, isLoading: isUpdating } = trpc.cards.updateCard.useMutation({
          onSuccess: () => onSuccess("update"),
          onError: (err) => onError("update", { error: err.message }),
     });

     const handleAddCard = async (values: NewCardParams) => {
          // const newCard: NewCardParams = {
          //      id: "",
          //      front: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          //      back: "back",
          //      history: [],
          //      createdAt: new Date(),
          //      updatedAt: new Date(),
          // };

          // const { } = await createCardAction()

          // const createCard = await db.card.create({
          //      data: {
          //           userId,
          //           collectionId,
          //           front,
          //           back,
          //      },
          // })

          createCard(values);

          // addCard(newCard);
     };

     return (
          <CardDialog>
               <div>
                    {type === "icon" && (
                         <IconButton
                              onClick={() => handleAddCard({ front: "front", back: "back", collectionId: "1" })}
                              icon={PlusIcon} />
                    )}

                    {type === "default" && (
                         <Button
                              variant="secondary"
                              onClick={() => handleAddCard({ front: "front", back: "back", collectionId: "1" })}
                              className="flex text-[12px] sm:text-[14px] gap-x-[5px] font-semibold">
                              Add New Card
                              <Plus className="w-[15px] h-[15px]" />
                         </Button>
                    )}
               </div>
          </CardDialog>
     );
}

export default AddNewCard;