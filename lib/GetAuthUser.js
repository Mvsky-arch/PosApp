"use server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/Session";

export default async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get(process.env.SESSION_NAME)?.value;

  if (session) {
    // const user = await decrypt(session);
    console.log(session);
    return JSON.parse(session);
  }
  return false;
}
