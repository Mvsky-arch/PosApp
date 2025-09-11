"use client";

import React, { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaFingerprint } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";
import { LoginAction } from "@/actions/auth/LoginAction";
import { SetErrorList } from "@/lib/AppLib";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(LoginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state]);

  if (!state?.success) {
    return (
      <div className="w-full min-h-[calc(100vh-140px)] h-full bg-gray-300 flex flex-col items-center justify-center">
        <form action={action}>
          <div className="bg-white rounded-2xl w-[720px] p-20 shadow-2xl flex flex-col  justify-center items-center space-y-2">
            <div className="text-3xl text-blue-500">Enter To Your Account</div>
            <div className="text-base">Welcome Back, Member</div>
            <label className="w-full ml-4">EMAIL</label>

            <div className="w-full flex items-center p-2 rounded-xl gap-3 relative ">
              <ImMail4 className="text-3xl text-gray-600 left-4 absolute" />
              <input
                name="email"
                placeholder="Input your Email"
                defaultValue={state?.email}
                className="border-1 border-gray-400 py-3 pl-12 pr-3 rounded-lg w-full"
              />
            </div>
            <span className="text-sm text-red-500 w-full ml-4">
              {state?.errors.email && (
                <SetErrorList errorArray={state.errors.email} />
              )}
            </span>
            <label className="w-full ml-4">PASSWORD</label>
            <div className="w-full flex items-center  p-2 rounded-xl gap-3 relative">
              <FaFingerprint className="text-3xl text-gray-600 absolute left-4" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Input your password"
                defaultValue={state?.password}
                className="border-1 border-gray-400 py-3 pl-12 pr-3 rounded-lg w-full"
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
            <span className="text-sm text-red-500 w-full ml-4">
              {state?.errors.password && (
                <SetErrorList errorArray={state.errors.password} />
              )}
            </span>

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 cursor-pointer text-white py-4 px-12 rounded-md w-full"
            >
              {isPending ? "Please Wait ..." : "Login Now"}
            </button>
            <p className="w-full p-1">
              By pressing the Login button, you agree to the Terms & Conditions
              and Privacy Policy.
            </p>
            <div className="relative w-full flex items-center justify-center p-2">
              <div className="w-2/3 h-[1px] bg-gray-500"></div>
              <h3 className="text-md px-4 text-gray-500">OR</h3>
              <div className="w-2/3 h-[1px] bg-gray-500"></div>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mb-1 w-full ml-4">
              Don't have an account{" "}
              <span className="text-gray-900 cursor-pointer">
                <Link href="/register" className="text-base text-blue-700">
                  Sign Up
                </Link>
              </span>{" "}
              Here
            </p>
            <p className="text-xs md:text-sm text-gray-500 w-full ml-4">
              Lost Password ?{" "}
              <span className="text-gray-900 cursor-pointer">
                <Link href="/lost-password" className="text-base text-blue-700">
                  Click
                </Link>
              </span>{" "}
              Here
            </p>
          </div>
        </form>
      </div>
    );
  }
};

export default LoginForm;
