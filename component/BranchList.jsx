import React from "react";
import { IoBarcode } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa";

const BranchList = ({ branch, selectedBranch, setSelectedBranch }) => {
  if (branch.length == 0)
    return (
      <span className="py-3 border-t-1 border-slate-400 _flex_row items-center gap-4 px-4 ">
        <TiDeleteOutline className="text-3xl text-red-500 ml-12" />
        Branch Not Found
      </span>
    );

  return (
    <ul>
      {branch.map((item) => (
        <li
          onClick={() => {
            setSelectedBranch(item);
          }}
          key={item.id}
          className={`${
            selectedBranch?.id === item.id
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-500 hover:text-white cursor-pointer"
          } py-2   border-t-1 border-slate-400`}
        >
          <div className="_flex_row items-center gap-4 px-4">
            <IoBarcode className="text-3xl ml-12" />
            <div className="w-full">
              <span className="block text-base truncate_1">
                {item.branchName}
              </span>
              <span className="block text-sm truncate_1">
                {item.branchAddress}
              </span>
            </div>
            <FaChevronRight className="text-sm " />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BranchList;
