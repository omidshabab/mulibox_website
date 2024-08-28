import { db } from "@/lib/db";
import { SectionType, History, Box, Part } from "@prisma/client";

const today = new Date();
today.setHours(0, 0, 0, 0);

export async function updateCardReview({
  cardId,
  status,
}: {
  cardId: string;
  status: boolean;
}) {
  const card = await db.card.findFirst({
    where: { id: cardId },
    include: {
      history: true,
    },
  });

  if (!card) return null;

  const user = await db.user.findFirst({
    where: {
      id: card.userId,
    },
  });

  if (!user) return null;

  if (!card.boxId)
    await db.card.update({
      where: {
        id: cardId,
      },
      data: {
        boxId: user.box,
      },
    });

  if (!card.boxId || !user.box) return null;

  const box = await db.box.findFirst({
    where: {
      id: card.boxId,
    },
    include: {
      sections: {
        include: {
          parts: true,
        },
      },
    },
  });

  if (!box) return null;

  if (!(card.history.length > 0) || !status) {
    const sectionOne = box.sections.find((section) => section.type === "one");

    if (!sectionOne) return null;

    const sectionOneParts = sectionOne.parts;

    if (
      sectionOneParts &&
      sectionOneParts.length > 0 &&
      sectionOneParts[sectionOneParts.length - 1].createdAt === today
    ) {
      await db.part.update({
        where: { id: sectionOneParts[sectionOneParts.length - 1].id },
        data: {
          cards: {
            connect: {
              id: cardId,
            },
          },
        },
      });
    }

    const sectionOnePart = await db.part.create({
      data: {
        sectionId: sectionOne.id,
        reviewAt: getReviewAt({ sectionType: SectionType.one }),
      },
    });

    await db.section.update({
      where: {
        id: sectionOne.id,
      },
      data: {
        parts: {
          connect: {
            id: sectionOnePart.id,
          },
        },
      },
    });

    let cardHistory: History;

    if (
      !(card.history.length > 0) ||
      card.history[card.history.length - 1].date !== today
    ) {
      cardHistory = await db.history.create({
        data: {
          cardId,
          section: SectionType.one,
          status,
        },
      });
    } else {
      cardHistory = await db.history.update({
        where: {
          id: card.history[card.history.length - 1].id,
        },
        data: {
          section: SectionType.one,
          status,
        },
      });
    }

    await db.card.update({
      where: {
        id: cardId,
      },
      data: {
        sectionId: sectionOne.id,
        partId: sectionOnePart.id,
        history: {
          connect: {
            id: cardHistory.id,
          },
        },
      },
    });
  } else {
    if (!card.sectionId || !card.partId) return null;

    const cardSection = await db.section.findFirst({
      where: {
        id: card.sectionId,
      },
      include: {
        parts: true,
      },
    });

    const cardPart = await db.part.findFirst({
      where: {
        id: card.partId,
      },
      include: {
        cards: true,
      },
    });

    if (!cardSection || !cardPart) return null;

    const reviewAt = getReviewAt({
      sectionType: cardSection.type,
    });

    const nextSectionType = getNextSectionType(cardSection.type);

    const nextSection = box.sections.find(
      (section) => section.type === nextSectionType
    );

    if (!nextSection) return null;

    let cardHistory: History;

    if (
      !(card.history.length > 0) ||
      card.history[card.history.length - 1].date !== today
    ) {
      cardHistory = await db.history.create({
        data: {
          cardId,
          section: nextSectionType !== "out" ? nextSectionType : null,
          status,
        },
      });
    } else {
      cardHistory = await db.history.update({
        where: {
          id: card.history[card.history.length - 1].id,
        },
        data: {
          section: nextSectionType !== "out" ? nextSectionType : null,
          status,
        },
      });
    }

    if (nextSectionType !== "out") {
      let nextPart: Part;
      if (
        nextSection.parts[nextSection.parts.length - 1].reviewAt !== reviewAt
      ) {
        nextPart = await db.part.create({
          data: {
            sectionId: nextSectionType,
            reviewAt,
            cards: {
              connect: {
                id: cardId,
              },
            },
          },
        });
      } else {
        nextPart = await db.part.update({
          where: {
            id: nextSection.parts[nextSection.parts.length - 1].id,
          },
          data: {
            reviewAt,
            cards: {
              connect: {
                id: cardId,
              },
            },
          },
        });
      }

      await db.card.update({
        where: {
          id: cardId,
        },
        data: {
          sectionId: nextSection.id,
          partId: nextPart.id,
          history: {
            connect: {
              id: cardHistory.id,
            },
          },
        },
      });
    } else {
      await db.card.update({
        where: {
          id: cardId,
        },
        data: {
          sectionId: null,
          partId: null,
          history: {
            connect: {
              id: cardHistory.id,
            },
          },
        },
      });
    }

    if (!(cardPart.cards.length > 0)) {
      await db.part.delete({
        where: {
          id: cardPart.id,
        },
      });
    }
  }
}

export function getReviewAt({ sectionType }: { sectionType: SectionType }) {
  let reviewAt = new Date(today);

  switch (sectionType) {
    case "one": {
      reviewAt.setDate(today.getDate() + 1); // Next day
      break;
    }
    case "two": {
      reviewAt.setDate(today.getDate() + 2); // Day after tomorrow
      break;
    }
    case "three": {
      reviewAt.setDate(today.getDate() + 4); // 4 days later
      break;
    }
    case "four": {
      reviewAt.setDate(today.getDate() + 8); // 8 days later
      break;
    }
    case "five": {
      reviewAt.setDate(today.getDate() + 16); // 16 days later
      break;
    }
    default: {
      throw new Error(`Unknown section type: ${sectionType}`);
    }
  }

  return reviewAt;
}

function getNextSectionType(currentType: SectionType): SectionType | "out" {
  const sectionOrder = [
    SectionType.one,
    SectionType.two,
    SectionType.three,
    SectionType.four,
    SectionType.five,
  ];

  const currentIndex = sectionOrder.indexOf(currentType);
  const nextIndex = currentIndex + 1;

  if (nextIndex >= sectionOrder.length) {
    return "out";
  }

  return sectionOrder[nextIndex];
}
