import NavLink from "@/component/item/NavLink";
import getAuthUser from "@/lib/GetAuthUser";
import {
  GetStaffByUserId,
  GetStaffRoleByStaffId,
} from "@/actions/query/StaffQuery";

import { isNotLogin } from "@/lib/LogCheck";

const Staff = async () => {
  await isNotLogin();

  const authUser = await getAuthUser();
  const { id } = authUser;

  const staffList = await GetStaffByUserId(id);

  return (
    <div className="container mx-auto m-4 flex-flex-col space-y-4">
      <NavLink href="/staff/add" label="Add Staff" />
      <div>
        {/* {JSON.stringify(staffList)} */}
        {staffList && (
          <div className="mt-4 py-2">
            <strong> List Of Staff</strong>
            <hr />

            <table className="w-full">
              <thead>
                <tr>
                  <td className="w-[50px]">
                    <strong>No</strong>
                  </td>
                  <td>
                    <strong>Staff Name</strong>
                  </td>
                  <td>
                    <strong>Staff Email</strong>
                  </td>
                  <td>
                    <strong>Staff Branch</strong>
                  </td>
                  <td>
                    <strong>Role</strong>
                  </td>
                  <td className="w-[150px]">
                    <strong>Action</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                {staffList.map(async (staff, idx) => {
                  const staffRole = await GetStaffRoleByStaffId(staff.id);
                  //const branch = await GetBranchById(staffRole.branch_id);
                  return (
                    <tr key={staff.id}>
                      <td className="w-[30px]">{idx + 1}</td>
                      <td>{staff.name} </td>
                      <td>{staff.email} </td>
                      <td> </td>
                      <td>{staffRole?.role} </td>
                      <td className="w-[150px]">Detail</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;
