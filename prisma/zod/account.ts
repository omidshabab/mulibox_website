import * as z from "zod"
import { CompleteNotification, relatedNotificationSchema, CompleteUser, relatedUserSchema } from "./index"

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  providerId: z.string(),
  accountId: z.string(),
  refreshToken: z.string().nullish(),
  accessToken: z.string().nullish(),
  accessTokenExpiresAt: z.date().nullish(),
  tokenType: z.string().nullish(),
  scope: z.string().nullish(),
  idToken: z.string().nullish(),
  sessionState: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteAccount extends z.infer<typeof accountSchema> {
  notifications: CompleteNotification[]
  user: CompleteUser
}

/**
 * relatedAccountSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAccountSchema: z.ZodSchema<CompleteAccount> = z.lazy(() => accountSchema.extend({
  notifications: relatedNotificationSchema.array(),
  user: relatedUserSchema,
}))
