import BusinnesForm from "@/component/store-settings/form-modal/BisnisForm";
import getAuthUser from "@/lib/GetAuthUser";
import { GetBisnisByUserId } from "@/actions/query/TableQuery";
import { isNotLogin } from "@/lib/LogCheck";

const AddBisnis = async () => {
  await isNotLogin();

  const authUser = await getAuthUser();
  const { id } = authUser;

  const bisnisList = await GetBisnisByUserId(id);
  return <BusinnesForm bisnisList={JSON.stringify(bisnisList)} />;
};

export default AddBisnis;
