import { StaffListFilter } from "@/lib/MapFilterLib";

import getAuthUser from "@/lib/GetAuthUser";
import StoreSettingsMenu from "@/component/store-settings/menu";
import BranchListTable from "@/component/store-settings/BranchListTable";
import BisnisListTable from "@/component/store-settings/BIsnisListTable";

import GetStoreData from "@/actions/query/StoreQuery";
import { isNotLogin } from "@/lib/LogCheck";

const StoreSettingsPage = async () => {
  await isNotLogin();

  const authUser = await getAuthUser();

  const { bisnisList, branchList, staffList, staffRole } = await GetStoreData(
    authUser.id
  );

  const availableStaff = StaffListFilter(staffList, staffRole);

  return (
    <div className="container mx-auto flex flex-col p-4 space-y-4">
      <StoreSettingsMenu bisnisList={JSON.stringify(bisnisList)} />
      {bisnisList.length > 0 ? (
        <div className="flex flex-col">
          <BisnisListTable bisnisList={bisnisList} />
          <BranchListTable
            branchList={JSON.stringify(branchList)}
            staffList={JSON.stringify(staffList)}
            availableStaffList={JSON.stringify(availableStaff)}
          />
        </div>
      ) : (
        <div>Bisnis Not Found, Please Add One Using Button Above</div>
      )}
    </div>
  );
};

export default StoreSettingsPage;
