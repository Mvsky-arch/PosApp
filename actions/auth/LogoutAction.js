"use server";
import { cookies } from "next/headers";

export async function logout() {
  try {
    const cookieStore = await cookies();
    //cookieStore.set(process.env.SESSION_NAME, "value", { maxAge: 0 });
    cookieStore.delete(process.env.SESSION_NAME);
    console.log("Logout Success");
    return {
      message: "Logout Success ....",
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
