"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    const cookieStore = await cookies();
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
