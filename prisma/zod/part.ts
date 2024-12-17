import * as z from "zod"
import { CompleteSection, relatedSectionSchema, CompleteCard, relatedCardSchema } from "./index"

export const partSchema = z.object({
  id: z.string(),
  sectionId: z.string(),
  reviewAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePart extends z.infer<typeof partSchema> {
  section: CompleteSection
  cards: CompleteCard[]
}

/**
 * relatedPartSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPartSchema: z.ZodSchema<CompletePart> = z.lazy(() => partSchema.extend({
  section: relatedSectionSchema,
  cards: relatedCardSchema.array(),
}))
