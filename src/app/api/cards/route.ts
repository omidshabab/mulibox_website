import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCards } from "@/lib/api/cards/queries";
import { dashRoutes } from "@/config/routes";

import { createCard } from "@/lib/api/cards/mutations";
import {
  cardIdSchema,
  insertCardParams,
  updateCardParams,
} from "@/lib/db/schema/cards";

export async function GET() {
  try {
    const { cards } = await getCards();

    revalidatePath(dashRoutes.default);

    return NextResponse.json(cards, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const validatedData = insertCardParams.parse(await req.json());
    const { card } = await createCard(validatedData);

    revalidatePath(dashRoutes.default);

    return NextResponse.json(card, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}
