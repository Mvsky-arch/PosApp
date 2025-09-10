"use client";
import BisnisList from "@/component/BisnisList";
import { useState, useEffect } from "react";
import { GetSalesDataByTimeRange } from "@/actions/query/StoreQuery";
import {
  getSalesDataByBranchId,
  getSalesDataByBisnisId,
  GetBranchListByBisnisId,
} from "@/lib/MapFilterLib";
import {
  AiFillCodepenSquare,
  AiFillExperiment,
  AiFillGift,
  AiFillSketchCircle,
} from "react-icons/ai";
import TimeSelector from "@/component/item/TimeSelector";

import { getToday } from "@/lib/DateLib";

const SalesPage_ = ({ bisnisData, branchData, user_id }) => {
  const [bisnisIdSelected, setBisnisIdSelected] = useState(0);

  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState({
    startDate: getToday(),
    endDate: getToday(),
  });

  useEffect(() => {
    setBisnisIdSelected(JSON.parse(bisnisData)[0].id);
    fetchDataSales(timeRange);
  }, []);

  useEffect(() => {
    fetchDataSales(timeRange);
  }, [timeRange]);

  async function fetchDataSales(timeRange) {
    setLoading(true);
    const { dataSales } = await GetSalesDataByTimeRange(user_id, timeRange);
    setSalesData(JSON.parse(dataSales));
    setLoading(false);
  }

  return (
    <div className="Page-Layout-Col my-8 border-1 border-slate-400">
      <div className="_flex_row ">
        <BisnisList
          bisnisData={bisnisData}
          bisnisIdSelected={bisnisIdSelected}
          setBisnisIdSelected={setBisnisIdSelected}
          setKategoryIdSelected={() => {}}
        />
        <SalesDetails
          bisnisId={bisnisIdSelected}
          salesData={salesData}
          branchData={branchData}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      </div>
    </div>
  );
};

const SalesDetails = ({
  bisnisId,
  salesData,
  branchData,
  timeRange,
  setTimeRange,
}) => {
  const branchList = GetBranchListByBisnisId(JSON.parse(branchData), bisnisId);

  return (
    <div className="_flex-col w-[70%] min-h-[700px] bg-slate-200  p-4">
      <div className="_flex_row justify-end items-center gap-4 p-4">
        Periode : {timeRange.startDate} Sampai Dengan {timeRange.endDate}
        <TimeSelector setTimeRange={setTimeRange} />
      </div>
      <SalesSummary bisnisId={bisnisId} salesData={salesData} />
      <BranchSummary branchList={branchList} salesData={salesData} />
    </div>
  );
};

const SalesSummary = ({ bisnisId, salesData }) => {
  const { rows, revenue, modal } = getSalesDataByBisnisId(salesData, bisnisId);

  const items = [
    { title: "Revenue", value: revenue, icon: <AiFillCodepenSquare /> },
    { title: "Modal", value: modal, icon: <AiFillExperiment /> },
    { title: "Total Orders", value: rows, icon: <AiFillGift /> },
    { title: "Profit", value: revenue - modal, icon: <AiFillSketchCircle /> },
  ];

  const SalesItem = ({
    title,
    value = 1000,
    icon = <AiFillCodepenSquare />,
  }) => {
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

  return (
    <div className="_flex_col">
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

const BranchSummary = ({ branchList, salesData }) => {
  return (
    <div className="flex flex-col space-y-2 py-3">
      <span>Rincian </span>
      <div className="flex flex-row gap-2 bg-slate-50 rounded-xs border-1 border-slate-300">
        <div className="w-[40%] text-center p-3">Nama Cabang</div>
        <div className="w-[15%] text-center p-3">Pendapatan</div>
        <div className="w-[15%] text-center p-3">Modal</div>
        <div className="w-[15%] text-center p-3">Total Order</div>
        <div className="w-[15%] text-center p-3">Keuntungan</div>
      </div>
      {branchList?.map((branch, idx) => {
        const { rows, revenue, modal } = getSalesDataByBranchId(
          salesData,
          branch.id
        );

        return (
          <ul className="flex flex-row gap-2" key={idx}>
            <li className="w-[40%] bg-white p-3 rounded-sm">
              {branch.branchName}
            </li>
            <li className="w-[15%] bg-white text-end p-3 rounded-sm">
              {revenue}
            </li>
            <li className="w-[15%] bg-white text-end p-3 rounded-sm">
              {modal}
            </li>
            <li className="w-[15%] bg-white text-end p-3 rounded-sm">{rows}</li>
            <li className="w-[15%] bg-white text-end p-3 rounded-sm">
              {revenue - modal}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default SalesPage_;
