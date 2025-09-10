import React from "react";
import LabelWithNumber from "@/component/item/LabelWithNumber";

const BisnisList = ({
  bisnisData,
  bisnisIdSelected,
  setBisnisIdSelected,
  setKategoryIdSelected,
}) => {
  return (
    <div className="_flex_col w-[30%] bg-slate-100 border-r-1  border-slate-400">
      <LabelWithNumber
        label="Bisnis List"
        number={JSON.parse(bisnisData).length}
      />
      <ul>
        {JSON.parse(bisnisData).map((bisnis) => (
          <BisnisItem
            bisnis={bisnis}
            key={bisnis.id}
            selected={bisnis.id === bisnisIdSelected ? true : false}
            setBisnisIdSelected={setBisnisIdSelected}
            setKategoryIdSelected={setKategoryIdSelected}
          />
        ))}
      </ul>
    </div>
  );
};

export const BisnisItem = ({
  bisnis,
  selected,
  setBisnisIdSelected,
  setKategoryIdSelected,
}) => {
  return (
    <li
      className={` ${
        selected
          ? "bg-black text-white"
          : "bg-white hover:bg-black hover:text-white cursor-pointer"
      } p-4  _flex_col border-b-1 border-slate-400`}
      onClick={() => {
        setBisnisIdSelected(bisnis.id);
        setKategoryIdSelected(0);
      }}
    >
      <span className="font-semibold"> {bisnis.businnessName}</span>
      <span className="truncate_1"> {bisnis.businnessAddress}</span>
    </li>
  );
};
export default BisnisList;
