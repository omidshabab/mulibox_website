import { db } from "@/lib/db/index";
import {
  CardId,
  NewCardParams,
  UpdateCardParams,
  updateCardSchema,
  insertCardSchema,
  cardIdSchema,
} from "@/lib/db/schema/cards";
import { getUserAuth } from "@/lib/auth/utils";

export const createCard = async (card: NewCardParams) => {
  const { session } = await getUserAuth();
  const newCard = insertCardSchema.parse({
    ...card,
    userId: session?.user.id!,
  });
  try {
    const p = await db.card.create({ data: newCard });
    return { card: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCard = async (id: CardId, card: UpdateCardParams) => {
  const { session } = await getUserAuth();
  const { id: cardId } = cardIdSchema.parse({ id });
  const newCard = updateCardSchema.parse({
    ...card,
    userId: session?.user.id!,
  });
  try {
    const p = await db.card.update({
      where: { id: cardId, userId: session?.user.id! },
      data: newCard,
    });
    return { card: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCard = async (id: CardId) => {
  const { session } = await getUserAuth();
  const { id: cardId } = cardIdSchema.parse({ id });
  try {
    const p = await db.card.delete({
      where: { id: cardId, userId: session?.user.id! },
    });
    return { card: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
