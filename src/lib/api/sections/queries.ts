import { db } from "@/lib/db/index";
import { SectionId, sectionIdSchema } from "@/lib/db/schema/sections";

export const getSections = async (boxId: string) => {
  const p = await db.section.findFirst({
    where: { boxId },
    include: {
      parts: {
        include: {
          cards: true,
        },
      },
    },
  });

  return { sections: p };
};

export const getSectionById = async (id: SectionId) => {
  const { id: sectionId } = sectionIdSchema.parse({ id });

  const p = await db.section.findFirst({
    where: { id: sectionId },
  });

  if (!p) return null;

  return { sections: p };
};
