import React from "react";
import StaffForm from "@/component/staff/StaffForm";
import { isNotLogin } from "@/lib/LogCheck";

const AddStaff = async () => {
  await isNotLogin();

  return (
    <div className="Page-Container">
      <StaffForm />
    </div>
  );
};

export default AddStaff;
