"use server";
import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";
import { StaffRoleTable } from "@/models/TableModel";
import { GetStaffEmailByStaffId } from "@/actions/query/StaffQuery";
import bcrypt from "bcrypt";

const StaffAssignmentAction = async (state, formData) => {
  const authUser = await getAuthUser();
  const { id } = authUser;

  if (!id) {
    redirect("/login");
  }

  const staff_id = formData.get("staff_id");
  const branch_id = formData.get("branch_id");
  const role = formData.get("role");
  const email = await GetStaffEmailByStaffId(staff_id);

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(
    process.env.DEFAULT_STAFF_PASSWORD,
    salt
  );

  try {
    StaffRoleTable.create({
      id: Date.now(),
      email,
      password: hashPassword,
      branch_id,
      staff_id,
      user_id: id,
      role,
      is_active: 1,
    });

    return {
      message: "Assigment Completed",
      completed: true,
      content: { staff_id, branch_id, role, email },
    };
  } catch (error) {
    console.log(error);
  }
};

export default StaffAssignmentAction;
