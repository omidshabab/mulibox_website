import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteCollection, relatedCollectionSchema, CompletePart, relatedPartSchema, CompleteHistory, relatedHistorySchema } from "./index"

export const cardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  collectionId: z.string(),
  partId: z.string().nullish(),
  front: z.string(),
  back: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCard extends z.infer<typeof cardSchema> {
  user: CompleteUser
  collection: CompleteCollection
  part?: CompletePart | null
  history: CompleteHistory[]
}

/**
 * relatedCardSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCardSchema: z.ZodSchema<CompleteCard> = z.lazy(() => cardSchema.extend({
  user: relatedUserSchema,
  collection: relatedCollectionSchema,
  part: relatedPartSchema.nullish(),
  history: relatedHistorySchema.array(),
}))
