"use server";
import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";
import { StaffFormSchema } from "@/lib/Rules";
import { StaffTable } from "@/models/TableModel";

const AddStaffAction = async (state, formData) => {
  const authUser = await getAuthUser();
  const { id } = authUser;

  if (!id) {
    redirect("/login");
  }

  const id_number = formData.get("id_number");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");

  const validateFields = StaffFormSchema.safeParse({
    id_number,
    name,
    phone,
    email,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      id_number,
      name,
      phone,
      email,
    };
  }

  try {
    const staff = await StaffTable.findOne({ where: { email } });
    if (staff)
      return {
        errors: {
          email: ["Email has registered, Please choose another One"],
        },
        id_number,
        name,
        phone,
        email,
      };

    StaffTable.create({
      id: Date.now(),
      id_number,
      name,
      phone,
      email,
      user_id: id,
      is_active: 1,
    });

    return {
      message: name + " Add Completed",
      completed: true,
    };
  } catch (error) {
    console.log(error);
  }
};

export default AddStaffAction;
