import * as z from "zod"
import { Locale } from "@prisma/client"
import { CompleteAccount, relatedAccountSchema } from "./index"

export const notificationSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  content: z.string(),
  locale: z.nativeEnum(Locale).nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteNotification extends z.infer<typeof notificationSchema> {
  account: CompleteAccount
}

/**
 * relatedNotificationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedNotificationSchema: z.ZodSchema<CompleteNotification> = z.lazy(() => notificationSchema.extend({
  account: relatedAccountSchema,
}))
