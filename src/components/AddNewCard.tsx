"use client"

import { Button } from "@/components/ui/button";
import { CardListFilter, CardProps, useCardStore } from "@/lib/cards";
import { Plus, PlusIcon } from "lucide-react";
import CardDialog from "./CardDialog";
import { Card, NewCardParams } from "@/lib/db/schema/card";
import { createCardAction } from "@/lib/actions/card";
import IconButton from "./IconButton";

type AddCardButtonType = "default" | "icon"

const AddNewCard = ({
     type = "default"
}: {
     type?: AddCardButtonType
}) => {
     const handleAddCard = async () => {
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

          // addCard(newCard);
     };

     return (
          <CardDialog>
               <div>
                    {type === "icon" && (
                         <IconButton
                              onClick={handleAddCard}
                              icon={PlusIcon} />
                    )}

                    {type === "default" && (
                         <Button
                              variant="secondary"
                              onClick={handleAddCard}
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