export function SuccessInfo({ isOpen, onGotIt, title, message }) {
  // if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-10 ${
        isOpen ? "visible bg-black/50" : "invisible"
      }`}
    >
      <div
        className={`bg-white  rounded-lg shadow p-12 transition-all relative max-w-screen ${
          isOpen ? "scale-120 opacity-100" : "scale-150 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-end items-center">
          <span className="text-xl font-bold w-full text-black">{title}</span>
        </div>
        <p className="text-black p-2 w-full text-lg">{message}</p>

        <div className="w-lg text-black flex flex-col items-center">
          <div className="flex flex-row justify-end w-full">
            <button
              className="bg-blue-500 rounded-lg py-2 px-4 text-white font-semibold mt-4 cursor-pointer w-[100px]"
              onClick={onGotIt}
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
