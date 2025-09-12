import { StaffTable } from "@/models/TableModel";
import { StaffRoleTable } from "@/models/TableModel";

export const GetStaffEmailByStaffId = async (id) => {
  const staffList = await StaffTable.findOne({
    where: { id },
    attributes: ["email"],
    raw: true,
  });
  return staffList.email;
};

export const GetStaffByUserId = async (user_id) => {
  const staffList = await StaffTable.findAll({
    where: { user_id },
    attributes: ["id", "id_number", "name", "phone", "email"],
    raw: true,
  });
  return staffList;
};

export const GetStaffRoleByUserId = async (user_id) => {
  const staffRole = await StaffRoleTable.findAll({
    where: { user_id },
    attributes: ["id", "email", "branch_id", "staff_id", "role", "is_active"],
    raw: true,
  });
  return staffRole;
};

export const GetStaffRoleByStaffId = async (staff_id) => {
  const staffRole = await StaffRoleTable.findOne({
    where: { staff_id },
    attributes: ["id", "email", "branch_id", "staff_id", "role", "is_active"],
    raw: true,
  });
  return staffRole;
};
export const GetStaffRoleByBranchId = async (branch_id) => {
  const FoStaff = await StaffRoleTable.findOne({
    where: { branch_id, role: "FRONT OFFICE" },
    attributes: ["id", "email", "branch_id", "role", "is_active"],
    raw: true,
  });

  const BoStaff = await StaffRoleTable.findOne({
    where: { branch_id, role: "BACK OFFICE" },
    attributes: ["id", "email", "branch_id", "role", "is_active"],
    raw: true,
  });

  return { FoStaff, BoStaff };
};
