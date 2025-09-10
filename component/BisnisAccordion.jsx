import { GetBranchListByBisnisId } from "@/lib/MapFilterLib";
import BranchList from "@/component/BranchList";
import { AiFillDollarCircle } from "react-icons/ai";
import LabelWithNumber from "@/component/item/LabelWithNumber";

const BisnisAccordion = ({
  bisnisList,
  branchList,
  selectedBranch,
  setSelectedBranch,
  selectedBisnisId,
  setSelectedBisnisId,
}) => {
  const bisnisListObj = JSON.parse(bisnisList);
  const branchListObj = JSON.parse(branchList);

  return (
    <div className="_flex_col w-[30%] min-h-[700px)] bg-slate-100 border-r-1 border-slate-400 ">
      <LabelWithNumber label="Bisnis List" number={bisnisListObj.length} />
      <ul className="w-full">
        {bisnisListObj.map((item) => {
          const branch = GetBranchListByBisnisId(branchListObj, item.id);
          return (
            <li key={item.id}>
              <Accordion
                bisnis={item}
                index={item.id}
                branch={branch}
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
                selectedBisnisId={selectedBisnisId}
                setSelectedBisnisId={setSelectedBisnisId}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const Accordion = ({
  index,
  bisnis,
  branch,
  selectedBranch,
  setSelectedBranch,
  selectedBisnisId,
  setSelectedBisnisId,
}) => {
  const toggleAccordion = (index) => {
    const content = document.getElementById(`content-${index}`);

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
      content.style.maxHeight = "0";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };

  return (
    <>
      <div className="border-b-1 border-slate-400">
        <button
          onClick={() => {
            toggleAccordion(index);
            setSelectedBisnisId(bisnis.id);
          }}
          className={`${
            selectedBisnisId === bisnis.id
              ? "bg-black text-white"
              : "hover:bg-black hover:text-white bg-slate-100"
          } w-full flex justify-between items-center p-4 cursor-pointer`}
        >
          <div className="_flex_row justify-between w-full items-center gap-4">
            <AiFillDollarCircle className="text-4xl" />
            <ul className="w-full text-start">
              <li className="font-semibold text-base truncate_1">
                {bisnis.businnessName}
              </li>
              <li className="truncate_1 text-sm"> {bisnis.businnessAddress}</li>
            </ul>
          </div>
        </button>
        <div
          id={`content-${index}`}
          className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out "
        >
          <BranchList
            branch={branch}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
        </div>
      </div>
    </>
  );
};

export default BisnisAccordion;
