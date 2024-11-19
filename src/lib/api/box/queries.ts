import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { BoxId, boxIdSchema } from "@/lib/db/schema/boxes";

export const getBox = async () => {
  const { session } = await getUserAuth();

  const p = await db.box.findFirst({
    where: { userId: session?.user.id! },
    include: {
      sections: {
        include: {
          parts: {
            include: {
              cards: {
                orderBy: {
                  updatedAt: "asc",
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return { box: p };
};

export const getBoxes = async () => {
  const { session } = await getUserAuth();

  const p = await db.box.findMany({
    where: { userId: session?.user.id! },
    include: {
      sections: {
        include: {
          parts: {
            include: {
              cards: true,
            },
            orderBy: {
              updatedAt: "asc",
            },
          },
        },
        orderBy: {
          updatedAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return { boxes: p };
};

export const getBoxById = async (id: BoxId) => {
  const { session } = await getUserAuth();

  const { id: boxId } = boxIdSchema.parse({ id });

  const p = await db.box.findFirst({
    where: { id: boxId, userId: session?.user.id! },
  });

  return { box: p };
};
