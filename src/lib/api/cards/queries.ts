import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CardId, cardIdSchema } from "@/lib/db/schema/cards";

export const getCards = async () => {
  const { session } = await getUserAuth();
  const p = await db.card.findMany({ where: {userId: session?.user.id!}});
  return { cards: p };
};

export const getCardById = async (id: CardId) => {
  const { session } = await getUserAuth();
  const { id: cardId } = cardIdSchema.parse({ id });
  const p = await db.card.findFirst({
    where: { id: cardId, userId: session?.user.id!}});
  return { card: p };
};

export const getCardHistory = async (id: CardId) => {
  const { session } = await getUserAuth();
  const { id: cardId } = cardIdSchema.parse({ id });
  const p = await db.card.findFirst({
    where: { id: cardId, userId: session?.user.id!},
    include: { history: { include: {card: true } } }
  });
  if (p === null) return { card: null, history: [] };
  const { history, ...card } = p;

  return { card, history:history };
};

