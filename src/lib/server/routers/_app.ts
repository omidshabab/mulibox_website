import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { cardsRouter } from "./cards";
import { collectionsRouter } from "./collections";

export const appRouter = router({
  account: accountRouter,
  cards: cardsRouter,
  collections: collectionsRouter,
});

export type AppRouter = typeof appRouter;
