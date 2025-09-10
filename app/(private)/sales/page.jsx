import getAuthUser from "@/lib/GetAuthUser";
import GetStoreData from "@/actions/query/StoreQuery";
import { bisnisListSort, branchListSort } from "@/lib/MapFilterLib";

import SalesPage_ from "@/component/page/SalesPage_";
import { isNotLogin } from "@/lib/LogCheck";

const Page = async () => {
  await isNotLogin();

  const authUser = await getAuthUser();

  const { bisnisList, branchList } = await GetStoreData(authUser.id);

  return (
    <SalesPage_
      bisnisData={JSON.stringify(bisnisListSort(bisnisList))}
      branchData={JSON.stringify(branchListSort(branchList))}
      user_id={authUser.id}
    />
  );
};

export default Page;
