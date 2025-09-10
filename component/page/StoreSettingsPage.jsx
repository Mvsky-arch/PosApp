"use client";
import BisnisAccordion from "@/component/BisnisAccordion";
import BranchDetails from "@/component/BranchDetails";
import { GetBranchListByBisnisId } from "@/lib/MapFilterLib";

import { useState, useEffect } from "react";

const StoreSettingsPage = ({
  bisnisList,
  branchList,
  staffRole,
  staffList,
}) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBisnisId, setSelectedBisnisId] = useState(null);

  const bisnisListObj = JSON.parse(bisnisList);
  const branchListObj = JSON.parse(branchList);

  useEffect(() => {
    if (bisnisListObj.length > 0) {
      setSelectedBisnisId(bisnisListObj[0].id);
      const firstBranchArray = GetBranchListByBisnisId(
        branchListObj,
        bisnisListObj[0].id
      );

      if (firstBranchArray.length > 0) {
        setSelectedBranch(firstBranchArray[0]);
      }
    }
  }, []);

  return (
    <div className="_flex_row Page-Layout-Col my-10 border-1 border-slate-400">
      <BisnisAccordion
        bisnisList={bisnisList}
        branchList={branchList}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        selectedBisnisId={selectedBisnisId}
        setSelectedBisnisId={setSelectedBisnisId}
      />
      <BranchDetails
        branch={selectedBranch}
        staffList={staffList}
        staffRole={staffRole}
      />
    </div>
  );
};

export default StoreSettingsPage;
