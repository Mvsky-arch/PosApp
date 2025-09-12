import {
  BisnisTable,
  BranchTable,
  KategoryTable,
  StaffTable,
  ProductTable,
} from "@/models/TableModel";

export const GetBisnisByUserId = async (id) => {
  const bisnis = await BisnisTable.findAll({
    where: { user_id: id },
    attributes: [
      "id",
      "businnessName",
      "businnessPhone",
      "businnessAddress",
      "user_id",
    ],
    raw: true,
  });
  return bisnis;
};

export const GetBranchByUserId = async (id) => {
  const branchs = await BranchTable.findAll({
    where: { user_id: id },
    attributes: [
      "id",
      "branchName",
      "branchPhone",
      "branchAddress",
      "user_id",
      "bisnis_id",
    ],
    raw: true,
  });
  return branchs;
};

export const GetKategoryByUserId = async (id) => {
  const kategory = await KategoryTable.findAll({
    where: { user_id: id },
    attributes: ["id", "kategory_name", "bisnis_id", "user_id"],
    raw: true,
  });
  return kategory;
};

export const GetStaffByUserId = async (id) => {
  const staff = await StaffTable.findAll({ raw: true, where: { user_id: id } });
  return staff;
};

export const GetProductByUserId = async (id) => {
  const product = await ProductTable.findAll({
    raw: true,
    where: { user_id: id },
  });
  return product;
};
