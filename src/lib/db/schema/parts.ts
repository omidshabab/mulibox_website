import { partSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getParts } from "@/lib/api/parts/queries";

// Schema for card - used to validate API requests
const baseSchema = partSchema.omit(timestamps);

export const insertPartSchema = baseSchema.omit({ id: true });
export const insertPartParams = baseSchema.extend({}).omit({
  id: true,
  sectionId: true,
});

export const updatePartSchema = baseSchema;
export const updatePartParams = updatePartSchema.extend({}).omit({
  sectionId: true,
});
export const partIdSchema = baseSchema.pick({ id: true });

// Types for card - used to type API request params and within Components
export type Part = z.infer<typeof partSchema>;
export type NewPart = z.infer<typeof insertPartSchema>;
export type NewPartParams = z.infer<typeof insertPartParams>;
export type UpdatePartParams = z.infer<typeof updatePartParams>;
export type PartId = z.infer<typeof partIdSchema>["id"];

// this type infers the return from getCard() - meaning it will include any joins
export type CompletePart = Awaited<ReturnType<typeof getParts>>["parts"];
