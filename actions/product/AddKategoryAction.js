"use server";
import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";
import { KategoryFormSchema } from "@/lib/Rules";
import { KategoryTable } from "@/models/TableModel";

const AddKategoryAction = async (state, formData) => {
  const authUser = await getAuthUser();
  const { id } = authUser;

  if (!id) {
    redirect("/login");
  }
  const bisnis_id = formData.get("bisnis_id");
  const kategory_name = formData.get("kategory_name").trim();
  const actions = formData.get("actions");
  const kategory_id = formData.get("kategory_id");

  const validateFields = KategoryFormSchema.safeParse({
    kategory_name,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      kategory_name,
    };
  }

  try {
    let message = "";
    let idKategory = Date.now();
    if (actions === "Insert") {
      KategoryTable.create({
        id: idKategory,
        kategory_name,
        bisnis_id,
        user_id: id,
      });

      message = kategory_name + " Add Completed";
    }

    if (actions === "Update") {
      idKategory = kategory_id;
      await KategoryTable.update(
        { bisnis_id, kategory_name },
        {
          where: {
            id: idKategory,
          },
        }
      );
      message = kategory_name + " Update Completed";
    }

    return {
      message,
      completed: true,
      idKategory,
    };
  } catch (error) {
    console.log(error);
  }
};

export default AddKategoryAction;
