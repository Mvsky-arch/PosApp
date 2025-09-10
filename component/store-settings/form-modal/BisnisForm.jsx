"use client";
import { useActionState, useState } from "react";
import { redirect } from "next/navigation";

import { SetErrorList } from "@/lib/AppLib";
import { SuccessInfo } from "@/component/alert/SuccessInfo";
import StoreSavingAction from "@/actions/store-settings/StoreSavingAction";

function BusinnesForm({ bisnisList }) {
  const [state, action, isPending] = useActionState(StoreSavingAction, null);
  const [current, setCurrent] = useState(0);

  const FormArr = [
    {
      id: 0,
      title: "Bisnis Form",
      component: <FormBisnis next={() => setCurrent(1)} state={state} />,
    },
    {
      id: 1,
      title: "Branch Form",
      component: (
        <BranchForm
          bisnisList={bisnisList}
          back={() => setCurrent(0)}
          next={() => setCurrent(2)}
          state={state}
        />
      ),
    },
    {
      id: 2,
      title: "Kategory Form",
      component: (
        <FormKategory
          back={() => setCurrent(1)}
          state={state}
          isPending={isPending}
        />
      ),
    },
  ];

  if (state?.completed) {
    console.log(state?.data);
  }

  return (
    <form action={action}>
      <div className="container flex flex-row justify-between bg-white mx-auto my-10 border-1 border-slate-400">
        <div className="w-[336px] border-r-1 bg-slate-50 border-slate-400 p-8">
          Existing Bisnis
        </div>
        <div className="w-[1200px]  overflow-hidden">
          <div
            className={`h-[700px] flex flex-row transition ease-out duration-500 `}
            style={{
              transform: `translateX(-${current * 1200}px)`,
            }}
          >
            {FormArr.map((form, idx) => {
              return <div key={idx}>{form.component}</div>;
            })}
          </div>
        </div>
      </div>
    </form>
  );
}

const FormBisnis = ({ state, next }) => {
  return (
    <div className="w-[1200px] h-full flex flex-col   justify-between mx-auto p-12">
      <div className="space-y-4">
        <span className="text-3xl text-blue-500">Enter To Your Account</span>

        <div className="My-Input-Wrapper">
          <label className="w-full ml-4">Businness Name</label>
          <input
            name="businnessName"
            placeholder="Input your Businness Name"
            defaultValue={state?.businnessName}
            className="My-Input"
          />
          <span className="text-sm text-red-500 w-full ml-4">
            {state?.errors?.businnessName && (
              <SetErrorList errorArray={state?.errors.businnessName} />
            )}
          </span>
        </div>
        <div className="My-Input-Wrapper">
          <label className="w-full ml-4">Business Phone</label>
          <input
            name="businnessPhone"
            type="text"
            placeholder="Input your Businness Phone"
            defaultValue={state?.businnessPhone}
            className="My-Input"
          />
          <span className="text-sm text-red-500 w-full ml-4">
            {state?.errors?.businnessPhone && (
              <SetErrorList errorArray={state.errors.businnessPhone} />
            )}
          </span>
        </div>
        <div className="My-Input-Wrapper">
          <label className="w-full ml-4">Business Address</label>
          <input
            name="businnessAddress"
            type="text"
            placeholder="Input your Businness Address"
            defaultValue={state?.businnessAddress}
            className="My-Input"
          />
          <span className="text-sm text-red-500 w-full ml-4">
            {state?.errors?.businnessAddress && (
              <SetErrorList errorArray={state.errors.businnessAddress} />
            )}
          </span>
        </div>
      </div>
      <div className="Button-Wrapper">
        <button
          type="button"
          className="Cancel-Btn hidden"
          onClick={() => redirect("/store-settings")}
        >
          Batal
        </button>
        <button type="button" className="Confirm-Btn" onClick={next}>
          Input Data Cabang
        </button>
      </div>
    </div>
  );
};

const FormKategory = ({ state, isPending, back }) => {
  return (
    <div className="w-[1200px] h-full flex flex-col   justify-between mx-auto p-12">
      <div className="My-Input-Wrapper space-y-4">
        <div className="text-2xl text-blue-500">Input Data Kategory</div>
        <input
          name="kategory"
          placeholder="Input your Businness Name"
          defaultValue={state?.kategory}
          className="My-Input"
        />
        <span className="text-sm text-red-500 w-full ml-4">
          {state?.errors?.kategory && (
            <SetErrorList errorArray={state?.errors.kategory} />
          )}
        </span>
        <span className="w-full items-center flex flex-col">
          {state?.message}
        </span>
      </div>
      <div>
        <div className="Button-Wrapper">
          <button type="button" className="Cancel-Btn" onClick={back}>
            Kembali
          </button>
          <button type="submit" disabled={isPending} className="Confirm-Btn">
            {isPending ? "Please Wait ..." : "Simpan Data Usaha"}
          </button>
        </div>
      </div>
    </div>
  );
};

function BranchForm({ back, next, state }) {
  return (
    <div className="w-[1200px] h-full flex flex-col   justify-between mx-auto p-12">
      <div className="space-y-4">
        <div className="text-3xl text-blue-500">Input New Branch</div>
        <div className="text-base">Welcome Back, Member</div>

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
      </div>

      <div className="Button-Wrapper">
        <button type="button" className="Cancel-Btn" onClick={back}>
          Kembali
        </button>
        <button type="button" className="Confirm-Btn" onClick={next}>
          Input Kategory
        </button>
      </div>
    </div>
  );
}
export default BusinnesForm;
