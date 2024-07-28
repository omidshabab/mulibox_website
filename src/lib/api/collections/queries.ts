import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CollectionId, collectionIdSchema } from "@/lib/db/schema/collections";

export const getCollection = async () => {
  const { session } = await getUserAuth();
  
  const p = await db.collection.findMany({ where: {userId: session?.user.id!}});

  for (const collection of p) {
    if(collection.default){
      return { collection };
    }
  }

  return { collection: null };
};

export const getCollections = async () => {
  const { session } = await getUserAuth();
  const p = await db.collection.findMany({ where: {userId: session?.user.id!}});
  return { collections: p };
};

export const getCollectionById = async (id: CollectionId) => {
  const { session } = await getUserAuth();
  const { id: collectionId } = collectionIdSchema.parse({ id });
  const p = await db.collection.findFirst({
    where: { id: collectionId, userId: session?.user.id!}});
  return { collection: p };
};

