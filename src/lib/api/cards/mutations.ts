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

export const updateCardHistory = async ({
  id,
  status,
}: {
  id: CardId;
  status: boolean;
}) => {
  const { id: cardId } = cardIdSchema.parse({ id });

  try {
    // Fetch the card with its history
    const card = await db.card.findUnique({
      where: { id: cardId },
      include: { history: true },
    });

    if (!card) {
      throw new Error("Card not found");
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day

    // Check if the last history entry is from today
    const lastHistory = card.history[card.history.length - 1];
    if (
      lastHistory &&
      lastHistory.date.toISOString().slice(0, 10) ===
        today.toISOString().slice(0, 10)
    ) {
      // Update the last history entry if it's from today
      await db.history.update({
        where: { id: lastHistory.id },
        data: { status },
      });
    } else {
      // Create a new history entry if the last one is not from today
      await db.history.create({
        data: {
          cardId: cardId,
          status: status,
        },
      });
    }
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
