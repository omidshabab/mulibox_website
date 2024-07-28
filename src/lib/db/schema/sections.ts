import { sectionSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getSections } from "@/lib/api/sections/queries";

// Schema for card - used to validate API requests
const baseSchema = sectionSchema.omit(timestamps);

export const insertSectionSchema = baseSchema.omit({ id: true });
export const insertSectionParams = baseSchema.extend({}).omit({
  id: true,
  boxId: true,
});

export const updateSectionSchema = baseSchema;
export const updateSectionParams = updateSectionSchema.extend({}).omit({
  boxId: true,
});
export const sectionIdSchema = baseSchema.pick({ id: true });

// Types for card - used to type API request params and within Components
export type Section = z.infer<typeof sectionSchema>;
export type NewSection = z.infer<typeof insertSectionSchema>;
export type NewSectionParams = z.infer<typeof insertSectionParams>;
export type UpdateSectionParams = z.infer<typeof updateSectionParams>;
export type SectionId = z.infer<typeof sectionIdSchema>["id"];

// this type infers the return from getCard() - meaning it will include any joins
export type CompleteSection = Awaited<
  ReturnType<typeof getSections>
>["sections"];
