import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { CardId, cardIdSchema } from "@/lib/db/schema/cards";

export const getCards = async () => {
  const { session } = await getUserAuth();

  const cards = await db.card.findMany({
    where: { userId: session?.user.id! },
    include: {
      history: true,
    },
  });

  return { cards };
};

export const getCardById = async (id: CardId) => {
  const { session } = await getUserAuth();

  const { id: cardId } = cardIdSchema.parse({ id });

  const card = await db.card.findFirst({
    where: { id: cardId, userId: session?.user.id! },
  });

  return { card };
};

export const getCardHistory = async (id: CardId) => {
  const { id: cardId } = cardIdSchema.parse({ id });

  const history = await db.history.findMany({
    where: { cardId },
  });

  if (!history) return { history: [] };

  return { history };
};
