"use client";
import LabelWithNumber from "@/component/item/LabelWithNumber";
import ProductList from "@/component/ProductList";
import { useState, useEffect } from "react";
import { getKategoryLengthByBisnisId } from "@/lib/MapFilterLib";

const KategoryList = ({
  kategoryData,
  productData,
  bisnisIdSelected,
  kategoryIdSelected,
  setKategoryIdSelected,
}) => {
  const kategoryListObj = JSON.parse(kategoryData);

  const [kategoryLength, setKategoryLength] = useState(0);
  let katLength = 0;

  useEffect(() => {
    const len = getKategoryLengthByBisnisId(kategoryListObj, bisnisIdSelected);
    setKategoryLength(len);
  }, [bisnisIdSelected]);

  return (
    <div className="_flex-col w-[70%] bg-slate-200">
      <LabelWithNumber label="Kategory List" number={kategoryLength} />
      <ul className="_flex_row p-2 gap-2 flex-wrap border-b-1 border-slate-400">
        <AllItemButton
          setKategoryIdSelected={setKategoryIdSelected}
          isSelected={kategoryIdSelected == 0 ? true : false}
          label={"All Product"}
        />

        {kategoryListObj?.map((item) => {
          if (item.bisnis_id === bisnisIdSelected) {
            katLength++;
            return (
              <KategoryItem
                kategory={item}
                key={item.id}
                setKategoryIdSelected={setKategoryIdSelected}
                isSelected={item.id === kategoryIdSelected ? true : false}
              />
            );
          }
        })}
      </ul>
      <ProductList
        productData={productData}
        bisnisIdSelected={bisnisIdSelected}
        kategoryIdSelected={kategoryIdSelected}
      />
    </div>
  );
};

export const AllItemButton = ({ setKategoryIdSelected, isSelected, label }) => {
  return (
    <li
      className={`${
        isSelected
          ? "bg-black text-white"
          : "hover:bg-black hover:text-white cursor-pointer"
      } py-1 px-6  _flex_col border-1 border-slate-400 rounded-2xl`}
      onClick={() => {
        setKategoryIdSelected(0);
      }}
    >
      <div className="_flex_row justify-between items-center gap-2">
        <span className="text-sm"> {label}</span>
      </div>
    </li>
  );
};

export const KategoryItem = ({
  kategory,
  setKategoryIdSelected,
  isSelected,
}) => {
  return (
    <li
      className={`${
        isSelected
          ? "bg-black text-white"
          : "hover:bg-black hover:text-white  cursor-pointer"
      } py-1 px-6  _flex_col border-1 border-slate-400 rounded-2xl`}
      onClick={() => {
        setKategoryIdSelected(kategory.id);
      }}
    >
      <div className="_flex_row justify-between items-center gap-2">
        <span className="text-sm"> {kategory.kategory_name}</span>
      </div>
    </li>
  );
};
export default KategoryList;
