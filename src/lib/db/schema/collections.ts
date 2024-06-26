import { collectionSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getCollections } from "@/lib/api/collections/queries";

// Schema for collections - used to validate API requests
const baseSchema = collectionSchema.omit(timestamps);

export const insertCollectionSchema = baseSchema.omit({ id: true });
export const insertCollectionParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateCollectionSchema = baseSchema;
export const updateCollectionParams = updateCollectionSchema.extend({}).omit({
  userId: true,
});
export const collectionIdSchema = baseSchema.pick({ id: true });

// Types for collections - used to type API request params and within Components
export type Collection = z.infer<typeof collectionSchema>;
export type NewCollection = z.infer<typeof insertCollectionSchema>;
export type NewCollectionParams = z.infer<typeof insertCollectionParams>;
export type UpdateCollectionParams = z.infer<typeof updateCollectionParams>;
export type CollectionId = z.infer<typeof collectionIdSchema>["id"];

// this type infers the return from getCollection() - meaning it will include any joins
export type CompleteCollection = Awaited<
  ReturnType<typeof getCollections>
>["collections"][number];
