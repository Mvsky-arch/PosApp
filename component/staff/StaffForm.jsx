"use client";
import { useActionState, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { SetErrorList } from "@/lib/AppLib";
import { SuccessInfo } from "@/component/alert/SuccessInfo";
import AddStaffAction from "@/actions/staff/AddStaffAction";

const StaffForm = () => {
  const [state, action, isPending] = useActionState(AddStaffAction, null);
  const [open, setOpen] = useState(true);

  if (state?.completed) {
    return (
      <SuccessInfo
        isOpen={open}
        onGotIt={() => {
          setOpen(false);
          redirect("/staff");
        }}
        title="Success Information !!"
        message={state?.message}
      />
    );
  }

  return (
    <div className="w-[640px] mx-auto p-4">
      <form action={action}>
        <div className="Form-Container">
          <div className="My-Input-Wrapper">
            <label className="w-full ml-4">Staff Id Number</label>
            <input
              name="id_number"
              placeholder="Input your Id Number"
              defaultValue={state?.id_number}
              className="My-Input"
            />
            <span className="text-sm text-red-500 w-full ml-4">
              {state?.errors?.id_number && (
                <SetErrorList errorArray={state.errors.id_number} />
              )}
            </span>
          </div>
          <div className="My-Input-Wrapper">
            <label className="w-full ml-4">Staff Name</label>
            <input
              name="name"
              placeholder="Input your Staff Name"
              defaultValue={state?.name}
              className="My-Input"
            />
            <span className="text-sm text-red-500 w-full ml-4">
              {state?.errors?.name && (
                <SetErrorList errorArray={state.errors.name} />
              )}
            </span>
          </div>
          <div className="My-Input-Wrapper">
            <label className="w-full ml-4">Staff Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="Input your Staff Phone"
              defaultValue={state?.phone}
              className="My-Input"
            />
            <span className="text-sm text-red-500 w-full ml-4">
              {state?.errors?.phone && (
                <SetErrorList errorArray={state.errors.phone} />
              )}
            </span>
          </div>
          <div className="My-Input-Wrapper">
            <label className="w-full ml-4">Staff Email</label>
            <input
              name="email"
              type="text"
              placeholder="Input your Staff Email"
              defaultValue={state?.email}
              className="My-Input"
            />
            <span className="text-sm text-red-500 w-full ml-4">
              {state?.errors?.email && (
                <SetErrorList errorArray={state.errors.email} />
              )}
            </span>
          </div>
          <span className="w-full items-center flex flex-col">
            {state?.message}
          </span>

          <div className="Button-Wrapper">
            <button
              className="Cancel-Btn"
              type="button"
              onClick={() => redirect("/staff")}
            >
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="Confirm-Btn">
              {isPending ? "Please Wait ..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;
