// import { db } from "@/lib/db";
// import { SectionType } from "@prisma/client";

// export async function getSectionId({
//   cardId,
//   status,
// }: {
//   cardId: string;
//   status: boolean;
// }): Promise<string> {
//   const card = await db.card.findUnique({
//     where: { id: cardId },
//     include: { part: { include: { section: true } } },
//   });

//   if (!card || !card.part?.section) {
//     throw new Error("Card or section not found");
//   }

//   const currentSection = card.part.section;

//   if (status) {
//     const nextSectionType = getNextSectionType(currentSection.type);
//     const nextSection = await db.section.findFirst({
//       where: {
//         boxId: currentSection.boxId,
//         type: nextSectionType,
//       },
//     });

//     if (!nextSection) {
//       throw new Error("Next section not found");
//     }

//     return nextSection.id;
//   } else {
//     const sectionOne = await db.section.findFirst({
//       where: {
//         boxId: currentSection.boxId,
//         type: SectionType.one,
//       },
//     });

//     if (!sectionOne) {
//       throw new Error("Section one not found");
//     }

//     return sectionOne.id;
//   }
// }

// function getNextSectionType(currentType: SectionType): SectionType {
//   const sectionOrder = [
//     SectionType.one,
//     SectionType.two,
//     SectionType.three,
//     SectionType.four,
//     SectionType.five,
//   ];

//   const currentIndex = sectionOrder.indexOf(currentType);
//   const nextIndex = (currentIndex + 1) % sectionOrder.length;

//   return sectionOrder[nextIndex];
// }
