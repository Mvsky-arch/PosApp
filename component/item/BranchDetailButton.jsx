"use client";

import { useState } from "react";
import { BranchDetailModal } from "@/component/item/modal/BranchDetailModal";
import PrimaryButton from "@/component/item/button/PrimaryButton";

const BranchDetailButton = ({ branch }) => {
  const [openModal, setOpenModal] = useState(false);

  const branchObj = JSON.parse(branch);

  return (
    <>
      <PrimaryButton
        classType="primary-button"
        label="Detail"
        clickAction={() => setOpenModal(true)}
      />
      <BranchDetailModal
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
        title={branchObj.branchName}
        branch={branchObj}
      />
    </>
  );
};

export default BranchDetailButton;
