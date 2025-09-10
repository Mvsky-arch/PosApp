"use client";
import Link from "next/link";
import React, { useState, useActionState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaFingerprint } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { ImMail4 } from "react-icons/im";

import { RegisterAction } from "@/actions/auth/RegisterAction";
import { SetErrorList } from "@/lib/AppLib";

const RegisterForm = () => {
  const [state, action, isPending] = useActionState(RegisterAction, null);

  const [showPassword, setShowPassword] = useState(false);
  const [showReTypePassword, setShowReTypePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleReTypePasswordVisibility = () => {
    setShowReTypePassword(!showReTypePassword);
  };
  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-gray-300 flex flex-col items-center justify-center py-12">
      {state?.success?.message ? (
        <div className="w-1/2 bg-white mx-auto p-6 rounded-2xl flex flex-col items-center space-y-2 ">
          <div>{state.success.message}</div>
          <span className="text-gray-900 cursor-pointer">
            To Access Your Account Please{" "}
            <Link href="/login" className="px-4 py-2 rounded-xl font-semibold">
              Sign In
            </Link>{" "}
            Here
          </span>
        </div>
      ) : (
        <form action={action}>
          <div className="bg-white rounded-xl w-[860px] min-h-[100px] p-18 shadow-xl flex flex-col gap-2">
            <span className="w-full justify-center flex flex-col">
              {/* <img
              src="logoipsum-367.svg"
              alt="Logo"
              className="h-10 mb-2 mt-4"
            /> */}
            </span>
            <div className="text-2xl text-blue-500 text-center justify-center flex ">
              Sign Up New Account
            </div>
            <label>NAME</label>

            <div className="w-full flex items-center  rounded-xl gap-3 relative ">
              <FaRegCircleUser className="text-3xl text-gray-600 left-4 absolute" />
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="border-1 border-gray-400 py-3 pl-16 pr-3 rounded-lg w-full"
                defaultValue={state?.name}
              />
            </div>
            <span className="text-sm text-red-500 ml-0">
              {state?.errors.name && (
                <SetErrorList errorArray={state.errors.name} />
              )}
            </span>

            <label>EMAIL</label>
            <div className="w-full flex items-center  rounded-xl gap-3 relative ">
              <ImMail4 className="text-3xl text-gray-600 left-4 absolute" />
              <input
                name="email"
                placeholder="Input your Email"
                className="border-1 border-gray-400 py-3 pl-16 pr-3 rounded-lg w-full"
                defaultValue={state?.email}
              />
            </div>
            <span className="text-sm text-red-500 ml-0">
              {state?.errors.email && (
                <SetErrorList errorArray={state.errors.email} />
              )}
            </span>

            <label>PASSWORD</label>
            <div className="w-full flex items-center  rounded-xl gap-3 relative ">
              <FaFingerprint className="text-3xl text-gray-600 left-4 absolute" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Input your password"
                className="border-1 border-gray-400 py-3 pl-16 pr-3 rounded-lg w-full"
                defaultValue={state?.password}
              />
              {showPassword ? (
                <FaRegEye
                  className="absolute right-5 cursor-pointer text-2xl text-gray-600"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaRegEyeSlash
                  className=" absolute right-5 cursor-pointer text-2xl text-gray-600"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <span className="text-sm text-red-500 ml-0">
              {state?.errors.password && (
                <SetErrorList errorArray={state.errors.password} />
              )}
            </span>

            <label>RE TYPE PASSWORD</label>
            <div className="w-full flex items-center  rounded-xl gap-3 relative ">
              <FaFingerprint className="text-3xl text-gray-600 left-4 absolute" />
              <input
                name="confirmPassword"
                type={showReTypePassword ? "text" : "password"}
                placeholder="Retype your password Again"
                className="border-1 border-gray-400 py-3 pl-16 pr-3 rounded-lg w-full"
                defaultValue={state?.confirmPassword}
              />
              {showReTypePassword ? (
                <FaRegEye
                  className="absolute right-5 cursor-pointer text-2xl text-gray-600"
                  onClick={toggleReTypePasswordVisibility}
                />
              ) : (
                <FaRegEyeSlash
                  className=" absolute right-5 cursor-pointer text-2xl text-gray-600"
                  onClick={toggleReTypePasswordVisibility}
                />
              )}
            </div>
            <span className="text-sm text-red-500 ml-0">
              {state?.errors.confirmPassword && (
                <SetErrorList errorArray={state.errors.confirmPassword} />
              )}
            </span>
            <div className="flex flex-row justify-center gap-2">
              <button
                type="button"
                className="bg-red-500 text-white p-4 rounded-md w-full cursor-pointer"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 text-white p-4 rounded-md w-full cursor-pointer"
              >
                {isPending ? "Please Wait ..." : "Register Now"}
              </button>
            </div>

            <div className="relative w-full flex items-center justify-center p-2">
              <div className="w-2/3 h-[1px] bg-gray-500"></div>
              <h3 className="text-md px-4 text-gray-500">OR</h3>
              <div className="w-2/3 h-[1px] bg-gray-500"></div>
            </div>
            <p className="text-xs md:text-sm text-gray-500 text-center mb-4">
              Have an account ?{" "}
              <span className="text-gray-900 cursor-pointer">
                <Link href="/login">Sign In</Link>
              </span>{" "}
              Here
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
