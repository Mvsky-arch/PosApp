import StaffSelector from "@/component/item/StaffSelector";
import { MdSettings } from "react-icons/md";
import {
  GetStaffRoleByBranchId,
  GetFOByBranchId,
  GetBOByBranchId,
  StaffListFilter,
} from "@/lib/MapFilterLib";

import stringprops from "@/config/Const";

const BranchDetails = ({ branch, staffList, staffRole }) => {
  if (!branch)
    return (
      <div className="_flex_row justify-center p-4">Please Select Branch</div>
    );

  const availableStaff = StaffListFilter(
    JSON.parse(staffList),
    JSON.parse(staffRole)
  );

  const staff = GetStaffRoleByBranchId(JSON.parse(staffRole), branch.id);

  return (
    <div className="_flex-col w-[70%] min-h-[700px] bg-slate-200">
      <div className="_flex_row justify-between items-center p-2 border-b-1 border-slate-400">
        <ul className="p-4 ">
          <li className="font-semibold text-2xl">{branch?.branchName}</li>
          <li>{branch?.branchPhone}</li>
          <li>{branch?.branchAddress}</li>
        </ul>
        <MdSettings className="text-4xl mr-6 cursor-pointer bg-white rounded-full hover:bg-slate-400 p-1" />
      </div>
      <StaffList
        staff={staff}
        branch={branch}
        availableStaff={JSON.stringify(availableStaff)}
      />
    </div>
  );
};

const StaffList = ({ staff, branch, availableStaff }) => {
  const FO = GetFOByBranchId(staff, branch.id);
  const BO = GetBOByBranchId(staff, branch.id);

  return (
    <>
      <div className="m-4">
        <table className="w-full">
          <thead>
            <tr>
              <td className="w-[30px] text-center">
                <strong>No</strong>
              </td>
              <td className="px-8">
                <strong>Staff Email</strong>
              </td>
              <td className="px-8">
                <strong>Staff Role</strong>
              </td>
              <td className="w-[150px]">
                <strong>Action</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-[30px] text-center">
                <strong>1</strong>
              </td>
              <td className="px-4 py-2">
                {FO ? (
                  FO.email
                ) : (
                  <StaffSelector
                    label="Add Front Office Staff"
                    availableStaffList={availableStaff}
                    branch={branch}
                    type={stringprops.FRONT_OFFICE_ROLE}
                  />
                )}
              </td>
              <td className="px-8">Front Office</td>
              <td className="w-[150px]"></td>
            </tr>
            <tr>
              <td className="w-[30px] text-center">
                <strong>2</strong>
              </td>
              <td className="px-4 py-2">
                {BO ? (
                  BO.email
                ) : (
                  <StaffSelector
                    label="Add Back Office Staff"
                    availableStaffList={availableStaff}
                    branch={branch}
                    type={stringprops.BACK_OFFICE_ROLE}
                  />
                )}
              </td>
              <td className="px-8">Back Office</td>
              <td className="w-[150px]"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BranchDetails;
