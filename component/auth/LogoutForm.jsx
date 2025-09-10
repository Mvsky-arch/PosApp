"use client";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth/LogoutAction";

function LogoutForm({ isOpen, onCancel, onConfirm, title, message }) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(logout, null);

  useEffect(() => {
    if (state?.success) {
      onCancel();
      router.push("/login");
    }
  }, [state]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        isOpen ? "visible bg-black/25" : "invisible"
      }`}
    >
      <div
        className={`bg-white  rounded-lg shadow p-12 transition-all relative ${
          isOpen ? "scale-120 opacity-100" : "scale-150 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-end items-center">
          <span className="text-xl font-bold w-full text-black">{title}</span>
        </div>
        <p className="text-black p-2 w-full text-lg">{message}</p>
        <form action={action}>
          <div className="w-lg text-black flex flex-col items-center">
            <div className="flex flex-row justify-end w-full">
              <button
                type="button"
                className="bg-red-500 rounded-lg py-2 px-4 text-white font-semibold mt-4 cursor-pointer mx-2"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 rounded-lg py-2 px-4 text-white font-semibold mt-4 cursor-pointer"
                // onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogoutForm;
