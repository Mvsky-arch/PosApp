import getAuthUser from "@/lib/GetAuthUser";
import GetStoreData from "@/actions/query/StoreQuery";
import StoreSettingsPage from "@/component/page/StoreSettingsPage";
import {
  bisnisListSort,
  branchListSort,
  staffListSort,
} from "@/lib/MapFilterLib";
import { redirect } from "next/navigation";

const StorePage = async () => {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/");
  }

  const { bisnisList, branchList, staffList, staffRole } = await GetStoreData(
    authUser?.id
  );

  return (
    <StoreSettingsPage
      bisnisList={JSON.stringify(bisnisListSort(bisnisList))}
      branchList={JSON.stringify(branchListSort(branchList))}
      staffList={JSON.stringify(staffListSort(staffList))}
      staffRole={JSON.stringify(staffRole)}
    />
  );
};

export default StorePage;
