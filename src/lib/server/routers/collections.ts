import {
  getCollectionById,
  getCollections,
} from "@/lib/api/collections/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  collectionIdSchema,
  insertCollectionParams,
  updateCollectionParams,
} from "@/lib/db/schema/collections";
import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "@/lib/api/collections/mutations";

export const collectionsRouter = router({
  getCollections: publicProcedure.query(async () => {
    return getCollections();
  }),
  getCollectionById: publicProcedure
    .input(collectionIdSchema)
    .query(async ({ input }) => {
      return getCollectionById(input.id);
    }),
  createCollection: publicProcedure
    .input(insertCollectionParams)
    .mutation(async ({ input }) => {
      return createCollection(input);
    }),
  updateCollection: publicProcedure
    .input(updateCollectionParams)
    .mutation(async ({ input }) => {
      return updateCollection(input.id, input);
    }),
  deleteCollection: publicProcedure
    .input(collectionIdSchema)
    .mutation(async ({ input }) => {
      return deleteCollection(input.id);
    }),
});
