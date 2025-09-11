"use server";
import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";
import { BranchFormSchema } from "@/lib/Rules";
import { BranchTable } from "@/models/TableModel";
import { revalidatePath } from "next/cache";

const BranchSavingActions = async (state, formData) => {
  const authUser = await getAuthUser();
  const { id } = authUser;

  if (!id) {
    redirect("/login");
  }
  const bisnis_id = formData.get("bisnis_id");
  const branchName = formData.get("branchName");
  const branchPhone = formData.get("branchPhone");
  const branchAddress = formData.get("branchAddress");

  const validateFields = BranchFormSchema.safeParse({
    branchName,
    branchPhone,
    branchAddress,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      branchName,
      branchPhone,
      branchAddress,
    };
  }

  try {
    BranchTable.create({
      id: Date.now(),
      branchName,
      branchPhone,
      branchAddress,
      user_id: id,
      bisnis_id,
      is_active: 1,
    });

    return {
      message: branchName + " Add Completed",
      completed: true,
      bisnis_id,
      branchName,
      branchPhone,
      branchAddress,
    };
  } catch (error) {
    console.log(error);
  }
};

export default BranchSavingActions;
