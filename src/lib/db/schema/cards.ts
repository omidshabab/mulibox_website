import { cardSchema, historySchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getCards } from "@/lib/api/cards/queries";

// Schema for card - used to validate API requests
const baseSchema = cardSchema.omit(timestamps);
const historyBaseSchema = historySchema.omit(timestamps);

export const insertCardSchema = baseSchema.omit({ id: true });
export const insertCardParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateCardSchema = baseSchema;
export const updateCardParams = updateCardSchema.extend({}).omit({
  userId: true,
});
export const cardIdSchema = baseSchema.pick({ id: true });
export const updateCardReviewSchema = historyBaseSchema.pick({
  cardId: true,
  status: true,
});
export const historyStatusSchema = historyBaseSchema.pick({
  cardId: true,
  status: true,
});

// Types for card - used to type API request params and within Components
export type Card = z.infer<typeof cardSchema>;
export type NewCard = z.infer<typeof insertCardSchema>;
export type NewCardParams = z.infer<typeof insertCardParams>;
export type UpdateCardParams = z.infer<typeof updateCardParams>;
export type CardId = z.infer<typeof cardIdSchema>["id"];

// this type infers the return from getCard() - meaning it will include any joins
export type CompleteCard = Awaited<
  ReturnType<typeof getCards>
>["cards"][number];
