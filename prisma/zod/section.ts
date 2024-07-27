import * as z from "zod"
import { SectionType } from "@prisma/client"
import { CompleteBox, relatedBoxSchema, CompletePart, relatedPartSchema } from "./index"

export const sectionSchema = z.object({
  id: z.string(),
  boxId: z.string(),
  type: z.nativeEnum(SectionType),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSection extends z.infer<typeof sectionSchema> {
  box: CompleteBox
  parts: CompletePart[]
}

/**
 * relatedSectionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSectionSchema: z.ZodSchema<CompleteSection> = z.lazy(() => sectionSchema.extend({
  box: relatedBoxSchema,
  parts: relatedPartSchema.array(),
}))
