import { ImCancelCircle } from "react-icons/im";

const PrimaryButton = ({ classType, label, clickAction = {} }) => {
  return (
    <button type="button" className={classType} onClick={clickAction}>
      {label}
    </button>
  );
};

export const SubmitButton = ({ classType, label, clickAction = {} }) => {
  return (
    <button type="submit" className={classType} onClick={clickAction}>
      {label}
    </button>
  );
};

export const InsertUpdateSelector = ({ actions, cancelAction }) => (
  <div className="px-2 py-2 w-full _flex_row justify-end text-md text-center">
    <span
      className={`px-6 py-1 ${
        actions === "Insert" ? "bg-black text-white " : "text-black "
      } rounded-l-2xl  px-4 py-2 border-1 border-black cursor-pointer`}
      onClick={cancelAction}
    >
      Insert
    </span>
    <span
      className={`px-2 py-1  _flex_row justify-between items-center gap-2 ${
        actions === "Update" ? "bg-black text-white" : "text-black "
      } rounded-r-2xl  px-4 py-2 border-1 border-black`}
    >
      Update
      <ImCancelCircle
        className={`text-2xl text-red-500 cursor-pointer ${
          actions === "Update" ? "flex" : "hidden"
        }`}
        onClick={cancelAction}
      />
    </span>
  </div>
);

export default PrimaryButton;
