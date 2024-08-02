import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CollectionId, collectionIdSchema } from "@/lib/db/schema/collections";

export const getCollection = async () => {
  const { session } = await getUserAuth();
  
  const user = await db.user.findFirst({where: {id: session?.user.id!}})

  if(!user || !user.collection) return {collection: null}

  const collection = await db.collection.findFirst({ where: {id: user.collection}});

  if(!collection) return {collection: null}

  return {collection}
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

