import { CardProps, History } from "@/lib/cards";

// Generate random date within the last 30 days
const randomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// Sample review history data
const histories: History[] = [
  { date: randomDate(18), status: true },
  { date: randomDate(7), status: false },
  { date: randomDate(0), status: true },
  { date: randomDate(1), status: true },
  { date: randomDate(2), status: true },
];

export const cards: CardProps[] = [
  {
    id: 1,
    front: "What is 2+2?",
    back: "4",
    history: [histories[0], histories[1]],
    createdAt: randomDate(30),
    updatedAt: randomDate(5),
  },
  {
    id: 2,
    front: "What is the capital of France?",
    back: "Paris",
    history: [histories[2], histories[3]],
    createdAt: randomDate(29),
    updatedAt: randomDate(4),
  },
  {
    id: 3,
    front: "What color is the sky?",
    back: "Blue",
    history: [histories[1], histories[2]],
    createdAt: randomDate(28),
    updatedAt: randomDate(3),
  },
  {
    id: 4,
    front: "What is 5x3?",
    back: "15",
    history: [histories[0], histories[3]],
    createdAt: randomDate(27),
    updatedAt: randomDate(2),
  },
  {
    id: 5,
    front: "What is the largest mammal?",
    back: "Blue Whale",
    history: [histories[1], histories[4]],
    createdAt: randomDate(26),
    updatedAt: randomDate(1),
  },
  {
    id: 6,
    front: "What is H2O?",
    back: "Water",
    history: [histories[2], histories[0]],
    createdAt: randomDate(25),
    updatedAt: randomDate(5),
  },
  {
    id: 7,
    front: "What planet do we live on?",
    back: "Earth",
    history: [histories[1], histories[2]],
    createdAt: randomDate(24),
    updatedAt: randomDate(4),
  },
  {
    id: 8,
    front: "What is the largest mammal?",
    back: "Blue Whale",
    history: [histories[0], histories[4]],
    createdAt: randomDate(23),
    updatedAt: randomDate(3),
  },
  {
    id: 9,
    front: "What is H2?",
    back: "Water",
    history: [histories[1], histories[2]],
    createdAt: randomDate(22),
    updatedAt: randomDate(2),
  },
  {
    id: 10,
    front: "What planet do we live on?",
    back: "Earth",
    history: [histories[0], histories[3]],
    createdAt: randomDate(21),
    updatedAt: randomDate(1),
  },
  {
    id: 11,
    front: "What country do we live on?",
    back: "Earth",
    history: [histories[2]],
    createdAt: randomDate(21),
    updatedAt: randomDate(1),
  },
];
