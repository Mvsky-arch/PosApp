"use server";
import getAuthUser from "@/lib/GetAuthUser";
import { StoreFormSchema } from "@/lib/Rules";
import { BisnisTable, BranchTable, KategoryTable } from "@/models/TableModel";
import { redirect } from "next/navigation";

const StoreSavingAction = async (state, formData) => {
  const authUser = await getAuthUser();
  const { id } = authUser;

  if (!id) {
    redirect("/login");
  }

  const businnessName = formData.get("businnessName");
  const businnessPhone = formData.get("businnessPhone");
  const businnessAddress = formData.get("businnessAddress");
  const branchName = formData.get("branchName");
  const branchPhone = formData.get("branchPhone");
  const branchAddress = formData.get("branchAddress");
  const kategory = formData.get("kategory");

  const validateFields = StoreFormSchema.safeParse({
    businnessName,
    businnessPhone,
    businnessAddress,
    branchName,
    branchPhone,
    branchAddress,
    kategory,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      businnessName,
      businnessPhone,
      businnessAddress,
      branchName,
      branchPhone,
      branchAddress,
      kategory,
    };
  }

  const bisnisId = Date.now();
  try {
    await BisnisTable.create({
      id: bisnisId,
      businnessName,
      businnessPhone,
      businnessAddress,
      user_id: id,
      is_active: 1,
    });

    await BranchTable.create({
      id: Date.now(),
      branchName,
      branchPhone,
      branchAddress,
      user_id: id,
      bisnis_id: bisnisId,
      is_active: 1,
    });

    await KategoryTable.create({
      id: Date.now(),
      kategory_name: kategory,
      bisnis_id: bisnisId,
      user_id: id,
    });

    return {
      message: businnessName + " Add Completed",
      completed: true,
      businnessName,
      businnessPhone,
      businnessAddress,
      branchName,
      branchPhone,
      branchAddress,
      kategory,
      data: {
        businnessName,
        businnessPhone,
        businnessAddress,
        branchName,
        branchPhone,
        branchAddress,
        kategory,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default StoreSavingAction;
