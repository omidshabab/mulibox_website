import { db } from "@/lib/db/index";
import {
  CollectionId,
  NewCollectionParams,
  UpdateCollectionParams,
  updateCollectionSchema,
  insertCollectionSchema,
  collectionIdSchema,
} from "@/lib/db/schema/collections";
import { getUserAuth } from "@/lib/auth/utils";

export const createCollection = async (collection: NewCollectionParams) => {
  const { session } = await getUserAuth();
  const newCollection = insertCollectionSchema.parse({
    ...collection,
    userId: session?.user.id!,
  });
  try {
    const p = await db.collection.create({ data: newCollection });
    return { collection: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCollection = async (
  id: CollectionId,
  collection: UpdateCollectionParams
) => {
  const { session } = await getUserAuth();
  const { id: collectionId } = collectionIdSchema.parse({ id });
  const newCollection = updateCollectionSchema.parse({
    ...collection,
    userId: session?.user.id!,
  });
  try {
    const p = await db.collection.update({
      where: { id: collectionId, userId: session?.user.id! },
      data: newCollection,
    });
    return { collection: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCollection = async (id: CollectionId) => {
  const { session } = await getUserAuth();
  const { id: collectionId } = collectionIdSchema.parse({ id });
  try {
    const p = await db.collection.delete({
      where: { id: collectionId, userId: session?.user.id! },
    });
    return { collection: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
