import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { cardsRouter } from "./cards";
import { collectionsRouter } from "./collections";
import { boxRouter } from "./box";

export const appRouter = router({
  account: accountRouter,
  cards: cardsRouter,
  collections: collectionsRouter,
  box: boxRouter,
});

export type AppRouter = typeof appRouter;
