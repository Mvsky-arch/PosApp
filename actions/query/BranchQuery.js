import { BranchTable } from "@/models/TableModel";

const GetBranchById = async (id) => {
  const branch = await BranchTable.findOne({
    where: { id },
    attributes: [
      "id",
      "branchName",
      "branchPhone",
      "branchAddress",
      "user_id",
      "bisnis_id",
    ],
  });
  return branch;
};
export default GetBranchById;
