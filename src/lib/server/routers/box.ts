import { getBoxById, getBox, getBoxes } from "@/lib/api/box/queries";
import { publicProcedure, router } from "@/lib/server/trpc";

import { boxIdSchema } from "@/lib/db/schema/boxes";

export const boxRouter = router({
  getBox: publicProcedure.query(async () => {
    return getBox();
  }),
  getBoxes: publicProcedure.query(async () => {
    return getBoxes();
  }),
  getBoxById: publicProcedure.input(boxIdSchema).query(async ({ input }) => {
    return getBoxById(input.id);
  }),
});
