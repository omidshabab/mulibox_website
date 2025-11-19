import * as z from "zod"
import { Locale } from "@prisma/client"
import { CompleteAccount, relatedAccountSchema, CompleteCard, relatedCardSchema, CompleteCollection, relatedCollectionSchema, CompleteBox, relatedBoxSchema, CompleteSession, relatedSessionSchema, CompleteSubscription, relatedSubscriptionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.boolean(),
  image: z.string().nullish(),
  outs: z.string().array(),
  locale: z.nativeEnum(Locale).nullish(),
  collection: z.string().nullish(),
  box: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  cards: CompleteCard[]
  collections: CompleteCollection[]
  boxes: CompleteBox[]
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
  boxes: relatedBoxSchema.array(),
  sessions: relatedSessionSchema.array(),
  subscription: relatedSubscriptionSchema.nullish(),
}))
