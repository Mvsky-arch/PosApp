"use client";
import { redirect } from "next/navigation";
import getAuthUser from "@/lib/GetAuthUser";
import GetStoreData, { GetStoreDataPlain } from "@/actions/query/StoreQuery";
import StoreSettingsPage from "@/component/page/StoreSettingsPage";
import {
  bisnisListSort,
  branchListSort,
  staffListSort,
} from "@/lib/MapFilterLib";

import { useState, useEffect } from "react";

const StorePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    bisnisList: "[]",
    branchList: "[]",
    staffList: "[]",
    staffRole: "[]",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const authUser = await getAuthUser();
    if (!authUser) {
      redirect("/login");
    }
    const { bisnisList, branchList, staffList, staffRole } =
      await GetStoreDataPlain(authUser?.id);

    setData({
      bisnisList,
      branchList,
      staffList,
      staffRole,
    });
    setLoading(false);
  }

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-150px)]">
      {isLoading ? (
        "Loading ...."
      ) : (
        <div>
          <StoreSettingsPage
            bisnisList={data.bisnisList}
            branchList={data.branchList}
            staffList={data.staffList}
            staffRole={data.staffRole}
          />
          {/* {typeof data.bisnisList} */}
        </div>
      )}
    </div>
  );
};

export default StorePage;
