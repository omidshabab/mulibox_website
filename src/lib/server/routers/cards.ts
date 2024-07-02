import { getCardById, getCardHistory, getCards } from "@/lib/api/cards/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  cardIdSchema,
  insertCardParams,
  updateCardParams,
} from "@/lib/db/schema/cards";
import {
  createCard,
  deleteCard,
  updateCard,
  updateCardHistory,
} from "@/lib/api/cards/mutations";

export const cardsRouter = router({
  getCards: publicProcedure.query(async () => {
    return getCards();
  }),
  getCardById: publicProcedure.input(cardIdSchema).query(async ({ input }) => {
    return getCardById(input.id);
  }),
  getCardHistory: publicProcedure
    .input(cardIdSchema)
    .query(async ({ input }) => {
      return getCardHistory(input.id);
    }),
  createCard: publicProcedure
    .input(insertCardParams)
    .mutation(async ({ input }) => {
      return createCard(input);
    }),
  updateCardHistory: publicProcedure
    .input(cardIdSchema)
    .mutation(async ({ input }) => {
      return updateCardHistory(input.id, true);
    }),
  updateCard: publicProcedure
    .input(updateCardParams)
    .mutation(async ({ input }) => {
      return updateCard(input.id, input);
    }),
  deleteCard: publicProcedure
    .input(cardIdSchema)
    .mutation(async ({ input }) => {
      return deleteCard(input.id);
    }),
});
