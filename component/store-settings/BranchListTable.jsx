import { GetStaffRoleByBranchId } from "@/actions/query/StaffQuery";
import BranchDetailButton from "@/component/item/BranchDetailButton";
import StaffSelector from "@/component/item/StaffSelector";

const BranchListTable = ({ branchList = [], availableStaffList }) => {
  return (
    <>
      {branchList?.length > 0 ? (
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <td className="w-[30px] text-center">
                  <strong>No</strong>
                </td>
                <td className="px-8">
                  <strong>Branch Name</strong>
                </td>
                <td className="px-8">
                  <strong>Front Office</strong>
                </td>
                <td className="px-8">
                  <strong>Back Office</strong>
                </td>
                <td className="w-[150px]">
                  <strong>Action</strong>
                </td>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(branchList).map(async (branch, idx) => {
                const { FoStaff, BoStaff } = await GetStaffRoleByBranchId(
                  branch.id
                );
                return (
                  <tr key={branch.id}>
                    <td className="w-[30px] text-center">{idx + 1}</td>
                    <td className="px-8">{branch.branchName}</td>
                    <td className="px-8">
                      {!FoStaff ? (
                        <>
                          <StaffSelector
                            label="Add FO Staff"
                            availableStaffList={availableStaffList}
                            branch={branch}
                            type="FRONT OFFICE"
                          />
                        </>
                      ) : (
                        <div>{FoStaff?.email}</div>
                      )}
                    </td>
                    <td className="px-8">
                      {!BoStaff ? (
                        <>
                          <StaffSelector
                            label="Add BO Staff"
                            availableStaffList={availableStaffList}
                            branch={branch}
                            type="BACK OFFICE"
                          />
                        </>
                      ) : (
                        <div>{BoStaff?.email}</div>
                      )}
                    </td>
                    <td className="w-[150px]">
                      <BranchDetailButton branch={JSON.stringify(branch)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Branch Not Found</div>
      )}
    </>
  );
};

export default BranchListTable;
