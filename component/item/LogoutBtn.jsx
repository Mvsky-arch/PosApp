"use client";
import { useState } from "react";
// import { logout } from "@/actions/auth/LogoutAction";
import LogoutForm from "@/component/auth/LogoutForm";
import PrimaryButton from "@/component/item/button/PrimaryButton";

const LogoutBtn = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryButton
        classType="logout-button"
        label="Logout"
        clickAction={() => setOpen(true)}
      />
      <LogoutForm
        isOpen={open}
        onCancel={() => setOpen(false)}
        // onConfirm={logout}
        title="Logout Confirmation !!"
        message="Are you sure to logout?"
      />
    </>
  );
};

export default LogoutBtn;
