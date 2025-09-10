import BranchForm from "@/component/store-settings/form-modal/BranchForm";
import getAuthUser from "@/lib/GetAuthUser";
import { GetBisnisByUserId } from "@/actions/query/TableQuery";
import { isNotLogin } from "@/lib/LogCheck";

const AddBranch = async () => {
  await isNotLogin();

  const authUser = await getAuthUser();
  const { id } = authUser;

  const bisnisList = await GetBisnisByUserId(id);

  return (
    <div className="Page-Container">
      <BranchForm bisnisList={JSON.stringify(bisnisList)} />
    </div>
  );
};

export default AddBranch;
