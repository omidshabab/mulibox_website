import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { BoxId, boxIdSchema } from "@/lib/db/schema/box";

export const getBox = async () => {
  const { session } = await getUserAuth();

  const p = await db.box.findFirst({
    where: { userId: session?.user.id! },
    include: {
      sections: {
        include: {
          parts: {
            include: {
              cards: true,
            },
          },
        },
      }, // Include the sections relation
    },
  });

  return { box: p };
};

export const getBoxById = async (id: BoxId) => {
  const { session } = await getUserAuth();

  const { id: boxId } = boxIdSchema.parse({ id });

  const p = await db.box.findFirst({
    where: { id: boxId, userId: session?.user.id! },
  });

  return { box: p };
};
