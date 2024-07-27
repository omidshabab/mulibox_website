import * as z from "zod"
import { CompleteCard, relatedCardSchema } from "./index"

export const historySchema = z.object({
  id: z.string(),
  cardId: z.string(),
  date: z.date(),
  status: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteHistory extends z.infer<typeof historySchema> {
  card: CompleteCard
}

/**
 * relatedHistorySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedHistorySchema: z.ZodSchema<CompleteHistory> = z.lazy(() => historySchema.extend({
  card: relatedCardSchema,
}))
