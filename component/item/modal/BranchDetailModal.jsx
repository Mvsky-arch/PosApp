"use client";
import { redirect } from "next/navigation";
import PrimaryButton from "@/component/item/button/PrimaryButton";

export const BranchDetailModal = ({ isOpen, onCancel, title, branch }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center w-full transition-colors z-10  ${
        isOpen ? "visible bg-black/25" : "invisible"
      }`}
    >
      <div
        className={`bg-white  rounded-lg shadow p-12 transition-all relative ${
          isOpen ? "scale-120 opacity-100" : "scale-150 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center w-[720px] px-8 ">
          <span className="text-xl font-bold w-full text-black">{title}</span>
          <span className="text-lg  w-full text-black">
            {branch?.branchAddress}
          </span>
          <span className="text-lg  w-full text-black">
            {branch?.branchPhone}
          </span>
        </div>
        <div className="mt-2 min-h-[360px] px-8">
          <h2>Staff List</h2>
          <hr />
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <td className="w-[30%]">Name</td>
                  <td className="w-[30%]">Email</td>
                  <td className="w-[30%]">Role</td>
                  <td className="w-[10%]"> Action</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-[30%]"></td>
                  <td className="w-[30%]"></td>
                  <td className="w-[30%]"></td>
                  <td className="w-[10%]"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-black p-2 w-full text-lg"></p>
        <div className="w-full text-black flex flex-col items-end">
          <PrimaryButton
            classType="primary-button"
            label="Got It"
            clickAction={() => {
              onCancel();
              redirect("/store-settings");
            }}
          />
        </div>
      </div>
    </div>
  );
};
