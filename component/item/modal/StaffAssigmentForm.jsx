import { useActionState } from "react";
import PrimaryButton, {
  SubmitButton,
} from "@/component/item/button/PrimaryButton";
import StaffAssignmentAction from "@/actions/staff/StaffAssignmentAction";
import { redirect } from "next/navigation";

const StaffAssigmentForm = ({
  isOpen,
  onCLose,
  type,
  availableStaffList,
  branch,
}) => {
  const [state, action, isPending] = useActionState(
    StaffAssignmentAction,
    null
  );

  const availableStaffListObj = JSON.parse(availableStaffList);
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center w-full transition-colors z-20  ${
        isOpen ? "visible bg-black/25" : "invisible"
      }`}
    >
      <div
        className={`bg-white  rounded-lg shadow p-12 transition-all relative ${
          isOpen ? "scale-120 opacity-100" : "scale-150 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center w-[720px] px-8 ">
          <span className="text-xl font-bold w-full text-black">
            {type} Assignment
          </span>
          <span className="text-lg  w-full text-black mt-4">
            <strong>{branch?.branchName}</strong>
          </span>
        </div>
        <form action={action}>
          <input type="hidden" name="branch_id" value={branch.id} />
          <input type="hidden" name="role" value={type} />
          {availableStaffListObj.length > 0 ? (
            <div className="mt-2 min-h-[240px] px-8">
              <div className="My-Input-Wrapper">
                <label className="w-full ml-4">Choose Staff</label>
                <div className="relative w-full">
                  <select name="staff_id" className="My-Input  text-lg">
                    {/* {JSON.parse(staffList).map((staff, idx) => { */}
                    {JSON.parse(availableStaffList).map((staff) => {
                      return (
                        <option
                          value={staff.id}
                          key={staff.id}
                          className="py-6 font-semibold text-lg"
                        >
                          {staff.name + " | " + staff.email}
                        </option>
                      );
                    })}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.2"
                    stroke="currentColor"
                    className="h-5 w-5 ml-1 absolute top-4.5 right-2.5 text-slate-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="ml-8 mt-16 w-full text-center">
              There is No Available Staff Right Now
            </div>
          )}

          <p className="text-black p-2 w-full text-lg"></p>
          <div className="w-full text-black flex flex-row justify-end gap-2">
            <PrimaryButton
              classType="primary-button"
              label="Cancel"
              clickAction={onCLose}
            />
            {availableStaffListObj.length > 0 && (
              <button
                type="submit"
                disabled={isPending}
                className="primary-button"
              >
                {isPending ? "Please Wait ..." : "Save"}
              </button>
            )}
          </div>
        </form>
        {state?.completed && redirect("/store-settings")}
      </div>
    </div>
  );
};

export default StaffAssigmentForm;
