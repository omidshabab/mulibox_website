import * as z from "zod"
import { CompleteHistory, relatedHistorySchema, CompleteCollection, relatedCollectionSchema, CompleteUser, relatedUserSchema } from "./index"

export const cardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  collectionId: z.string(),
  front: z.string(),
  back: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteCard extends z.infer<typeof cardSchema> {
  history: CompleteHistory[]
  collection: CompleteCollection
  user: CompleteUser
}

/**
 * relatedCardSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCardSchema: z.ZodSchema<CompleteCard> = z.lazy(() => cardSchema.extend({
  history: relatedHistorySchema.array(),
  collection: relatedCollectionSchema,
  user: relatedUserSchema,
}))
