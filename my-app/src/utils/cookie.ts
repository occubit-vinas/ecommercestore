"use server";

import { cookies } from "next/headers";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
}


export async function getuser():Promise<any>{

  const cookieStore = await cookies();

  const user = cookieStore.get('user')?.value;

  return JSON.parse(user);
}

