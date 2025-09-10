"use client";
import { useActionState, useState, useEffect, useRef } from "react";
import { useSearchParams, redirect } from "next/navigation";

import { SetErrorList } from "@/lib/AppLib";
import { SuccessInfo } from "@/component/alert/SuccessInfo";
import LabelWithNumber from "@/component/item/LabelWithNumber";
import { RiDeleteBin6Line } from "react-icons/ri";

import AddKategoryAction from "@/actions/product/AddKategoryAction";
import { getKategoryByBisnisId } from "@/lib/MapFilterLib";
import { InsertUpdateSelector } from "@/component/item/button/PrimaryButton";

const CategoryForm = ({ bisnisList, kategoryList }) => {
  const [state, action, isPending] = useActionState(AddKategoryAction, null);
  const [bisnisIdSelected, setBisnisIdSelected] = useState(0);
  const [kategoryListSelected, setKategoryListSelected] = useState([]);

  const [actions, setActions] = useState("Insert");
  const [kategoryClicked, setKategoryClicked] = useState({});

  const actionsElement = useRef();
  const kategoryIdElement = useRef();
  const bisnisElement = useRef();
  const kategoryNameElement = useRef();

  const bisnisListObj = JSON.parse(bisnisList);
  const kategoryListObj = JSON.parse(kategoryList);

  const [open, setOpen] = useState(true);

  const params = useSearchParams();
  let bisnisid = params.get("bisnisid");

  const setDefaultValue = () => {
    setBisnisIdSelected(bisnisid);
    setKategoryListSelected(
      getKategoryByBisnisId(kategoryListObj, parseInt(bisnisid))
    );
  };

  useEffect(setDefaultValue, []);

  useEffect(() => {
    const kategoryByBisnisId = getKategoryByBisnisId(
      kategoryListObj,
      parseInt(bisnisElement.current.value)
    );
    setKategoryListSelected(kategoryByBisnisId);
  }, [bisnisIdSelected]);

  useEffect(() => {
    Object.keys(kategoryClicked).length > 0
      ? setUpdatetMode()
      : setInsertMode();
  }, [kategoryClicked]);

  const setUpdatetMode = () => {
    actionsElement.current.value = "Update";
    kategoryIdElement.current.value = kategoryClicked?.id;
    bisnisElement.current.value = kategoryClicked?.bisnis_id;
    kategoryNameElement.current.value = kategoryClicked?.kategory_name;
    setActions("Update");
  };

  const setInsertMode = () => {
    actionsElement.current.value = "Insert";
    kategoryNameElement.current.value = "";
    setActions("Insert");
  };

  const onBisnisChangeHandler = () => {
    setBisnisIdSelected(parseInt(bisnisElement.current.value));
    setKategoryClicked({});
  };

  return (
    <div className="mx-auto shadow-2xl container flex flex-row justify-between mt-6 h-[750px] border-1 border-slate-400 mb-2">
      <form
        action={action}
        className="w-[70%] h-[750px] bg-white  _flex_col justify-between"
      >
        <div className="space-y-6 px-18 pt-10">
          <InsertUpdateSelector
            actions={actions}
            cancelAction={() => setKategoryClicked({})}
          />
          <input type="hidden" name="actions" ref={actionsElement} />
          <input type="hidden" name="kategory_id" ref={kategoryIdElement} />
          <div className="My-Input-Wrapper">
            <label className="w-full ml-4">Choose Bisnis</label>
            <div className="relative w-full">
              <select
                name="bisnis_id"
                className="My-Input"
                onChange={onBisnisChangeHandler}
                ref={bisnisElement}
                defaultValue={bisnisid}
              >
                {bisnisListObj.map((bisnis) => {
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
            <label className="w-full ml-4">Category Name</label>
            <input
              name="kategory_name"
              placeholder="Input your Kategory Name"
              defaultValue={state?.kategory_name}
              className="My-Input"
              ref={kategoryNameElement}
            />
            <span className="text-sm text-red-500 w-full ml-4">
              {state?.errors?.kategory_name && (
                <SetErrorList errorArray={state.errors.kategory_name} />
              )}
            </span>
          </div>
        </div>

        <div className="_flex_row justify-between">
          <button
            className="w-full text-center p-8 bg-red-500 text-white cursor-pointer"
            type="button"
            onClick={() => redirect("/product")}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="w-full text-center p-8 bg-blue-500 text-white font-semibold cursor-pointer"
          >
            {isPending ? "Please Wait ..." : "Save"}
          </button>
        </div>
      </form>
      <div className="w-[30%] border-l-1 border-slate-400 bg-slate-200 overflow-y-auto max-h-screen">
        <KategoryFiltered
          kategoryFiltered={kategoryListSelected}
          kategoryClicked={kategoryClicked}
          setKategoryClicked={setKategoryClicked}
        />
      </div>

      {state?.completed && (
        <SuccessInfo
          isOpen={open}
          onGotIt={() => {
            setOpen(false);
            redirect(
              `/product?bisnisid=${bisnisIdSelected}&categoryid=${state?.idKategory}`
            );
          }}
          title="Success Information !!"
          message={state?.message}
        />
      )}
    </div>
  );
};

const KategoryFiltered = ({
  kategoryFiltered = [],
  kategoryClicked,
  setKategoryClicked,
}) => {
  if (kategoryFiltered.length === 0) return null;

  return (
    <div>
      <LabelWithNumber
        label="Existing Kategory"
        number={kategoryFiltered.length}
      />
      <ul>
        <li className="px-4 py-2 text-sm border-b-1 border-slate-400 bg-white">
          Click Kategory Below To Update
        </li>
        {kategoryFiltered.map((kategory) => (
          <KategoryItem
            kategory={kategory}
            key={kategory.id}
            kategoryClicked={kategoryClicked}
            setKategoryClicked={setKategoryClicked}
          />
        ))}
      </ul>
    </div>
  );
};

const KategoryItem = ({ kategory, kategoryClicked, setKategoryClicked }) => {
  return (
    <li
      className={`bg-white  cursor-pointer   _flex_col border-b-1 border-slate-400 _flex_row justify-between text-lg`}
    >
      <span
        className={`truncate_1 hover:bg-black hover:text-white  w-full px-4 py-4 ${
          kategoryClicked?.id === kategory.id
            ? "bg-black text-white"
            : "hover:bg-black hover:text-white"
        }`}
        onClick={() => {
          setKategoryClicked(kategory);
        }}
      >
        {kategory.kategory_name}
      </span>
      <span className="text-3xl px-4 py-4  border-l-1 border-slate-300 hover:bg-blue-100 text-slate-400">
        <RiDeleteBin6Line />
      </span>
    </li>
  );
};

export default CategoryForm;
