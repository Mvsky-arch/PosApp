"use server";
import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";

export const isNotLogin = async () => {
  const authUser = await getAuthUser();
  if (!authUser) redirect("/login");
};

export const isLogin = async () => {
  const authUser = await getAuthUser();
  if (authUser) redirect("/dashboard");
};
