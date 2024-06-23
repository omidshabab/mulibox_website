import * as z from "zod"
import { CompleteCard, relatedCardSchema, CompleteUser, relatedUserSchema } from "./index"

export const collectionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  desc: z.string().nullish(),
  price: z.number().nullish(),
  slug: z.string().nullish(),
  tags: z.string().array(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteCollection extends z.infer<typeof collectionSchema> {
  cards: CompleteCard[]
  user: CompleteUser
}

/**
 * relatedCollectionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCollectionSchema: z.ZodSchema<CompleteCollection> = z.lazy(() => collectionSchema.extend({
  cards: relatedCardSchema.array(),
  user: relatedUserSchema,
}))
