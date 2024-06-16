import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteCard, relatedCardSchema, CompleteCollection, relatedCollectionSchema, CompleteSession, relatedSessionSchema, CompleteSubscription, relatedSubscriptionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  cards: CompleteCard[]
  collections: CompleteCollection[]
  sessions: CompleteSession[]
  subscription?: CompleteSubscription | null
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  cards: relatedCardSchema.array(),
  collections: relatedCollectionSchema.array(),
  sessions: relatedSessionSchema.array(),
  subscription: relatedSubscriptionSchema.nullish(),
}))
