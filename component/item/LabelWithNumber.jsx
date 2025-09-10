import React from "react";

const LabelWithNumber = ({ label, number }) => {
  return (
    <div className="p-4 text-2xl border-b-1 border-slate-400 _flex_row justify-between">
      {label}
      <span className="py-1 px-4 bg-black text-white rounded-full text-sm font-light">
        {number}
      </span>
    </div>
  );
};

export default LabelWithNumber;
