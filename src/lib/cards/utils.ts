import { BoxSectionType } from ".";
import { getCardByIdWithHistory } from "../api/card/queries";
import { Card } from "../db/schema/card";

export const categorizeCards = (
  cards: Card[]
): { [key in BoxSectionType]: Card[] } => {
  const categorizedCards: { [key in BoxSectionType]: Card[] } = {
    [BoxSectionType.one]: [],
    [BoxSectionType.two]: [],
    [BoxSectionType.three]: [],
    [BoxSectionType.four]: [],
    [BoxSectionType.five]: [],
  };

  const now = new Date();

  cards.forEach(async (card) => {
    const { history } = await getCardByIdWithHistory(card.id);
    if (history) {
      if (history.length > 0) {
        const lastReview = history[history.length - 1].date;
        const daysSinceLastReview = Math.floor(
          (now.getTime() - new Date(lastReview).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (daysSinceLastReview < 1) {
          categorizedCards[BoxSectionType.one].push(card);
        } else if (daysSinceLastReview < 2) {
          categorizedCards[BoxSectionType.two].push(card);
        } else if (daysSinceLastReview < 7) {
          categorizedCards[BoxSectionType.three].push(card);
        } else if (daysSinceLastReview < 14) {
          categorizedCards[BoxSectionType.four].push(card);
        } else {
          categorizedCards[BoxSectionType.five].push(card);
        }
      } else {
        // If no review history, you can decide where to put the card.
        // For now, we'll put it in the 'every day' category
        categorizedCards[BoxSectionType.one].push(card);
      }
    }
  });

  return categorizedCards;
};
