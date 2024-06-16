"use server";

import { getUserAuth } from "./utils";

export const getUser = async () => {
  const { session } = await getUserAuth();

  return { session };
};
