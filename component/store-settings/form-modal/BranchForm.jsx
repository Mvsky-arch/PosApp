"use client";
import { useActionState, useState } from "react";
import { redirect } from "next/navigation";
import { SetErrorList } from "@/lib/AppLib";
import { SuccessInfo } from "@/component/alert/SuccessInfo";
import BranchSavingActions from "@/actions/store-settings/BranchSavingActions";

function BranchForm({ bisnisList, back, next, state }) {
  return (
    <div className="w-[1200px] min-h-[600px] flex flex-row justify-between bg-white my-10">
      <div className="w-[500px] border-r-1 border-slate-400 p-8">
        Existing Bisnis
      </div>
      <div className="w-full min-h-[600px] flex flex-col justify-between  mx-auto p-8 ">
        <div className="text-3xl text-blue-500">Input New Branch</div>
        <div className="text-base">Welcome Back, Member</div>

        <div className="My-Input-Wrapper">
          <label className="w-full ml-4">Choose Bisnis</label>
          <div className="relative w-full">
            <select name="bisnis_id" className="My-Input">
              {JSON.parse(bisnisList).map((bisnis, idx) => {
                return (
                  <option value={bisnis.id} key={bisnis.id} className="py-6">
                    {bisnis.businnessName}
                  </option>
                );
              })}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="h-5 w-5 ml-1 absolute top-4.5 right-2.5 text-slate-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </div>
        </div>

        <div className="My-Input-Wrapper">
          <label className="w-full ml-4">Branch Name</label>
          <input
            name="branchName"
            placeholder="Input your Branch Name"
            defaultValue={state?.branchName}
            className="My-Input"
          />
          <span className="text-sm text-red-500 w-full ml-4">
            {state?.errors?.branchName && (
              <SetErrorList errorArray={state.errors.branchName} />
            )}
          </span>
        </div>
        <div className="My-Input-Wrapper">
          <label className="w-full ml-4">Branch Phone</label>
          <input
            name="branchPhone"
            type="text"
            placeholder="Input your Branch Phone"
            defaultValue={state?.branchPhone}
            className="My-Input"
          />
          <span className="text-sm text-red-500 w-full ml-4">
            {state?.errors?.branchPhone && (
              <SetErrorList errorArray={state.errors.branchPhone} />
            )}
          </span>
        </div>
        <div className="My-Input-Wrapper">
          <label className="w-full ml-4">Branch Address</label>
          <input
            name="branchAddress"
            type="text"
            placeholder="Input your Branch Address"
            defaultValue={state?.branchAddress}
            className="My-Input"
          />
          <span className="text-sm text-red-500 w-full ml-4">
            {state?.errors?.branchAddress && (
              <SetErrorList errorArray={state.errors.branchAddress} />
            )}
          </span>
        </div>

        <span className="w-full items-center flex flex-col">
          {state?.message}
        </span>

        <div className="Button-Wrapper">
          <button type="button" className="Cancel-Btn" onClick={back}>
            Kembali
          </button>
          <button type="button" className="Confirm-Btn" onClick={next}>
            Input Kategory
          </button>
        </div>
      </div>
    </div>
  );
}

export default BranchForm;
