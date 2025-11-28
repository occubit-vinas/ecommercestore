"use server";

import { cookies } from "next/headers";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();  // ✔ await required

  const token = cookieStore.get("token")?.value;

  return token;
}
