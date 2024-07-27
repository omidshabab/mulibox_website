import { getBoxById, getBox } from "@/lib/api/box/queries";
import { publicProcedure, router } from "@/lib/server/trpc";

import { boxIdSchema } from "@/lib/db/schema/box";

export const boxRouter = router({
  getBox: publicProcedure.query(async () => {
    return getBox();
  }),
  getBoxById: publicProcedure.input(boxIdSchema).query(async ({ input }) => {
    return getBoxById(input.id);
  }),
});
