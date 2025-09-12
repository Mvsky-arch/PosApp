import { redirect } from "next/navigation";
import getAuthUser from "@/lib/GetAuthUser";
import GetStoreData from "@/actions/query/StoreQuery";
import StoreSettingsPage from "@/component/page/StoreSettingsPage";
import {
  bisnisListSort,
  branchListSort,
  staffListSort,
} from "@/lib/MapFilterLib";

const StorePage = async () => {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }
  const { bisnisList, branchList, staffList, staffRole } = await GetStoreData(
    authUser?.id
  );

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-150px)]">
      <StoreSettingsPage
        bisnisList={JSON.stringify(bisnisListSort(bisnisList))}
        branchList={JSON.stringify(branchListSort(branchList))}
        staffList={JSON.stringify(staffListSort(staffList))}
        staffRole={JSON.stringify(staffRole)}
      />
    </div>
  );
};

export default StorePage;
