"use client";
import React from "react";
import { useState } from "react";
import PrimaryButton from "@/component/item/button/PrimaryButton";
import StaffAssigmentForm from "@/component/item/modal/StaffAssigmentForm";

const StaffSelector = ({ label, availableStaffList = [], branch, type }) => {
  const [openForm, setopenForm] = useState(false);

  return (
    <div className="flex flex-col w-fit">
      <PrimaryButton
        classType="primary-button"
        label={label}
        clickAction={() => {
          setopenForm(true);
        }}
      />
      <StaffAssigmentForm
        isOpen={openForm}
        type={type}
        onCLose={() => {
          setopenForm(false);
        }}
        availableStaffList={availableStaffList}
        branch={branch}
      />
    </div>
  );
};

export default StaffSelector;
