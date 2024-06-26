export enum BoxSectionType {
  one = "EVERY DAY",
  two = "EVERY OTHER DAY",
  three = "ONCE A WEEK",
  four = "EVERY OTHER WEEK",
  five = "ONCE A MONTH",
}

export type History = {
  date: Date;
  status: boolean;
};

export type CardProps = {
  id: number;
  front: string;
  back: string;
  history: History[];
  createdAt: Date;
  updatedAt: Date;
};

export enum CardType {
  front = "front",
  back = "back",
}

export enum CardListFilter {
  one = "Every Day Cards",
  two = "Every Other Day Cards",
  three = "Once a Week Cards",
  four = "Every Other Week Cards",
  five = "Once a Month Cards",
  all = "All Cards",
  active = "Active Cards",
}

interface CardState {
  cards: CardProps[];
  addCard: (card: CardProps) => void;
  updateCard: (updatedCard: CardProps) => void;
  deleteCard: (id: number) => void;
}

// export const useCardStore = create<CardState>((set) => ({
//   cards: [],
//   addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
//   updateCard: (updatedCard) =>
//     set((state) => ({
//       cards: state.cards.map((card) =>
//         card.id === updatedCard.id ? updatedCard : card
//       ),
//     })),
//   deleteCard: (id) =>
//     set((state) => ({
//       cards: state.cards.filter((card) => card.id !== id),
//     })),
// }));
