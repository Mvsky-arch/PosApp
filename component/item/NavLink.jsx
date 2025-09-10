"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }) => {
  const pathName = usePathname();

  return (
    <>
      {pathName === href ? (
        <span className="px-4 py-3 rounded-xl cursor-default">{label}</span>
      ) : (
        <Link
          href={href}
          className={`px-4 py-3 rounded-xl hover:bg-blue-500 font-light`}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default NavLink;
