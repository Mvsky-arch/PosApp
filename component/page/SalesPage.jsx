"use client";
import { useState, useEffect } from "react";
import BisnisAccordion from "@/component/BisnisAccordion";
import { GetSalesData } from "@/actions/query/StoreQuery";

import {
  GetBranchListByBisnisId,
  getSalesDataByBranchId,
} from "@/lib/MapFilterLib";

import {
  AiFillCodepenSquare,
  AiFillExperiment,
  AiFillGift,
  AiFillSketchCircle,
} from "react-icons/ai";

const SalesPage = ({ bisnisList, branchList, user_id }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBisnisId, setSelectedBisnisId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    SetDefaultBisnisAndBranch();
  }, []);

  useEffect(() => {
    fetchDataSales();
  }, [selectedBranch]);

  async function fetchDataSales() {
    setLoading(true);
    const { dataSales } = await GetSalesData(user_id);
    setSalesData(JSON.parse(dataSales));
    setLoading(false);
  }

  function SetDefaultBisnisAndBranch() {
    const bisnisListObj = JSON.parse(bisnisList);
    const branchListObj = JSON.parse(branchList);

    if (bisnisListObj?.length > 0) {
      setSelectedBisnisId(bisnisListObj[0].id);
      const firstBranchArray = GetBranchListByBisnisId(
        branchListObj,
        bisnisListObj[0].id
      );

      if (firstBranchArray?.length > 0) {
        setSelectedBranch(firstBranchArray[0]);
      }
    }
  }

  return (
    <div className="_flex_row Page-Layout-Col my-10 border-y-1 border-slate-400">
      {/* {selectedBranch} */}
      <BisnisAccordion
        bisnisList={bisnisList}
        branchList={branchList}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        selectedBisnisId={selectedBisnisId}
        setSelectedBisnisId={setSelectedBisnisId}
      />
      <SalesDetails
        branch={selectedBranch}
        salesData={JSON.stringify(salesData)}
        loading={loading}
      />
    </div>
  );
};

const SalesDetails = ({ branch, salesData, loading }) => {
  return (
    <div className="w-[70%] min-h-[700px] bg-slate-200 border-r-1 _flex-col p-4">
      <div className="_flex_row justify-between items-center border-b-1 border-slate-300 mb-4">
        <ul className="space-y-2">
          <li className="font-semibold text-2xl">{branch?.branchName}</li>
          <li>{branch?.branchPhone}</li>
          <li>{branch?.branchAddress}</li>
        </ul>
      </div>
      <SalesSummary branch={branch} salesData={salesData} />
    </div>
  );
};

const SalesSummary = ({ branch, salesData }) => {
  const { rows, revenue, modal } = getSalesDataByBranchId(
    JSON.parse(salesData),
    branch?.id
  );

  const items = [
    { title: "Revenue", value: revenue, icon: <AiFillCodepenSquare /> },
    { title: "Modal", value: modal, icon: <AiFillExperiment /> },
    { title: "Total Orders", value: rows, icon: <AiFillGift /> },
    { title: "Profit", value: revenue - modal, icon: <AiFillSketchCircle /> },
  ];

  return (
    <div className="_flex_col">
      {/* <div>{loading ? "Loading Please Wait ...." : ""}</div> */}
      <div className="_flex_row justify-between space-x-2">
        {items.map((item, idx) => {
          return (
            <SalesItem
              title={item.title}
              value={item.value}
              icon={item.icon}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

const SalesItem = ({ title, value = 1000, icon = <AiFillCodepenSquare /> }) => {
  return (
    <div className="_flex_row bg-white rounded-lg p-4 items-center w-[25%]">
      <div className="w-20 h-20 items-center justify-center flex text-6xl">
        {icon}
      </div>
      <div className="_flex_col w-full p-3">
        <div className="text-sm font-semibold text-slate-400">{title}</div>
        <div className="text-2xl text-end">{value}</div>
      </div>
    </div>
  );
};

export default SalesPage;
