import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteSection, relatedSectionSchema } from "./index"

export const boxSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteBox extends z.infer<typeof boxSchema> {
  user: CompleteUser
  sections: CompleteSection[]
}

/**
 * relatedBoxSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBoxSchema: z.ZodSchema<CompleteBox> = z.lazy(() => boxSchema.extend({
  user: relatedUserSchema,
  sections: relatedSectionSchema.array(),
}))
