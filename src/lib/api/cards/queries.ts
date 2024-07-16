import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { CardId, cardIdSchema } from "@/lib/db/schema/cards";

export const getCards = async () => {
  const { session } = await getUserAuth();
  const p = await db.card.findMany({
    where: { userId: session?.user.id! },
    include: {
      history: true, // Include the history relation
    },
  });
  return { cards: p };
};

export const getCardById = async (id: CardId) => {
  const { session } = await getUserAuth();
  const { id: cardId } = cardIdSchema.parse({ id });
  const p = await db.card.findFirst({
    where: { id: cardId, userId: session?.user.id! },
  });
  return { card: p };
};

export const getCardHistory = async (id: CardId) => {
  const { id: cardId } = cardIdSchema.parse({ id });

  const p = await db.history.findMany({
    where: { cardId },
  });

  if (p === null) return { history: [] };

  return { history: p };
};
