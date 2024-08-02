import { boxSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getBox } from "@/lib/api/box/queries";

// Schema for card - used to validate API requests
const baseSchema = boxSchema.omit(timestamps);

export const insertBoxSchema = baseSchema.omit({ id: true });
export const insertBoxParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateBoxSchema = baseSchema;
export const updateBoxParams = updateBoxSchema.extend({}).omit({
  userId: true,
});
export const boxIdSchema = baseSchema.pick({ id: true });

// Types for card - used to type API request params and within Components
export type Box = z.infer<typeof boxSchema>;
export type NewBox = z.infer<typeof insertBoxSchema>;
export type NewBoxParams = z.infer<typeof insertBoxParams>;
export type UpdateBoxParams = z.infer<typeof updateBoxParams>;
export type BoxId = z.infer<typeof boxIdSchema>["id"];

// this type infers the return from getCard() - meaning it will include any joins
export type CompleteBox = Awaited<ReturnType<typeof getBox>>["box"];
