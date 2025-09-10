"use client";
import Link from "next/link";
import { useState } from "react";

export const DropDownMenu = ({ href, label, menuList }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`px-4 py-3  hover:bg-blue-500 relative cursor-pointer`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={href}>{label}</Link>
      <div
        className={`absolute right-0 top-[47px]  bg-blue-500  w-[500px] flex-col font-extralight z-20  ${
          open ? "flex" : "hidden"
        }`}
      >
        {menuList?.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className={`px-8 py-6 hover:bg-blue-600 overflow-hidden cursor-pointer`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
