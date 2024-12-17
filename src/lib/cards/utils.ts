import { db } from "@/lib/db";
import { SectionType, Card } from "@prisma/client";
import { CompleteBox } from "../db/schema/boxes";
import { CompleteCard } from "../db/schema/cards";

type ReviewCardInput = {
  cardId: string;
  status: boolean;
};

const today = new Date();

export async function reviewCard({ cardId, status }: ReviewCardInput) {
  try {
    const card = await db.card.findFirst({
      where: { id: cardId },
      include: { history: true },
    });

    if (!card) return null;

    const user = await db.user.findFirst({ where: { id: card.userId } });
    if (!user) return null;

    if (!card.boxId) {
      await db.card.update({
        where: { id: cardId },
        data: { boxId: user.box },
      });
    }

    if (!user.box) return null;

    const box = await db.box.findFirst({
      where: { id: user.box },
      include: {
        sections: {
          include: {
            parts: { include: { cards: true } },
          },
        },
      },
    });
    if (!box) return null;

    if (card.history.length > 0) {
      if (status) {
        await handleCorrectReview(card, box);
      } else {
        await handleIncorrectReview(card, box);
      }
    } else {
      await handleNewCard(card, box);
    }
  } catch (err) {
    console.log("ERROR: ", err);
    return null;
  }
}

async function handleCorrectReview(card: CompleteCard, box: CompleteBox) {
  if (!card.sectionId || !card.partId) return null;

  const cardSection = await db.section.findFirst({
    where: { id: card.sectionId },
    include: { parts: { include: { cards: true } } },
  });
  if (!cardSection) return null;

  const nextSectionType = getNextSectionType(cardSection.type);
  const nextSection = box?.sections.find(
    (section) => section.type === nextSectionType
  );
  if (!nextSection) return null;

  const nextSectionParts = nextSection.parts;
  const reviewAt = getReviewAt({ sectionType: nextSection.type });

  if (
    nextSectionParts.length > 0 &&
    nextSectionParts[nextSectionParts.length - 1].createdAt
      .toISOString()
      .slice(0, 10) === today.toISOString().slice(0, 10)
  ) {
    await db.part.update({
      where: { id: nextSectionParts[nextSectionParts.length - 1].id },
      data: { cards: { connect: { id: card.id } } },
    });
  } else {
    const nextSectionPart = await db.part.create({
      data: {
        sectionId: nextSection.id,
        reviewAt,
        cards: { connect: { id: card.id } },
      },
    });

    await db.card.update({
      where: { id: card.id },
      data: { sectionId: nextSection.id, partId: nextSectionPart.id },
    });
  }

  await updateCardHistory(card, nextSection.type, true);
}

async function handleIncorrectReview(card: CompleteCard, box: CompleteBox) {
  const sectionOne = box?.sections.find((section) => section.type === "one");
  if (!sectionOne) return null;

  const sectionOneParts = sectionOne.parts;
  if (
    sectionOneParts.length > 0 &&
    sectionOneParts[sectionOneParts.length - 1].createdAt
      .toISOString()
      .slice(0, 10) === today.toISOString().slice(0, 10)
  ) {
    await db.part.update({
      where: { id: sectionOneParts[sectionOneParts.length - 1].id },
      data: { cards: { connect: { id: card.id } } },
    });
  } else {
    const sectionOnePart = await db.part.create({
      data: {
        sectionId: sectionOne.id,
        reviewAt: getReviewAt({ sectionType: SectionType.one }),
        cards: { connect: { id: card.id } },
      },
    });

    await db.card.update({
      where: { id: card.id },
      data: { sectionId: sectionOne.id, partId: sectionOnePart.id },
    });
  }

  await updateCardHistory(card, SectionType.one, false);
}

async function handleNewCard(card: CompleteCard, box: CompleteBox) {
  const sectionOne = box?.sections.find((section) => section.type === "one");
  if (!sectionOne) return null;

  const sectionOneParts = sectionOne.parts;
  if (
    sectionOneParts.length > 0 &&
    sectionOneParts[sectionOneParts.length - 1].createdAt
      .toISOString()
      .slice(0, 10) === today.toISOString().slice(0, 10)
  ) {
    await db.part.update({
      where: { id: sectionOneParts[sectionOneParts.length - 1].id },
      data: { cards: { connect: { id: card.id } } },
    });
  } else {
    const sectionOnePart = await db.part.create({
      data: {
        sectionId: sectionOne.id,
        reviewAt: getReviewAt({ sectionType: SectionType.one }),
        cards: { connect: { id: card.id } },
      },
    });

    await db.card.update({
      where: { id: card.id },
      data: { sectionId: sectionOne.id, partId: sectionOnePart.id },
    });
  }

  await db.history.create({
    data: {
      cardId: card.id,
      section: SectionType.one,
      status: true,
    },
  });
}

async function updateCardHistory(
  card: CompleteCard,
  sectionType: SectionType,
  status: boolean
) {
  if (
    card.history.length > 0 &&
    card.history[card.history.length - 1].date.toISOString().slice(0, 10) ===
      today.toISOString().slice(0, 10)
  ) {
    await db.history.update({
      where: { id: card.history[card.history.length - 1].id },
      data: { section: sectionType, status },
    });
  } else {
    await db.history.create({
      data: { cardId: card.id, section: sectionType, status },
    });
  }
}

function getReviewAt({ sectionType }: { sectionType: SectionType }): Date {
  const reviewAt = new Date(today);

  switch (sectionType) {
    case "one":
      reviewAt.setDate(today.getDate() + 1);
      break;
    case "two":
      reviewAt.setDate(today.getDate() + 2);
      break;
    case "three":
      reviewAt.setDate(today.getDate() + 4);
      break;
    case "four":
      reviewAt.setDate(today.getDate() + 8);
      break;
    case "five":
      reviewAt.setDate(today.getDate() + 16);
      break;
    default:
      throw new Error(`Unknown section type: ${sectionType}`);
  }

  return reviewAt;
}

function getNextSectionType(currentType: SectionType): SectionType | "out" {
  const sectionOrder: SectionType[] = [
    SectionType.one,
    SectionType.two,
    SectionType.three,
    SectionType.four,
    SectionType.five,
  ];
  const currentIndex = sectionOrder.indexOf(currentType);
  return currentIndex >= sectionOrder.length - 1
    ? "out"
    : sectionOrder[currentIndex + 1];
}
