import { db } from "@/lib/db";
import { PartId, partIdSchema } from "@/lib/db/schema/parts";

export const getParts = async (sectionId: string) => {
  const p = await db.part.findFirst({
    where: { sectionId },
    include: {
      cards: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return { parts: p };
};

export const getPartById = async (id: PartId) => {
  const { id: partId } = partIdSchema.parse({ id });

  const p = await db.part.findFirst({
    where: { id: partId },
  });

  if (!p) return null;

  return { part: p };
};
