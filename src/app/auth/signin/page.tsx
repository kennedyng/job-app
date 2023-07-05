"use client";

import { facebookIcon, googleIcon } from "@/app/asserts";
import { Input } from "@/app/components";
import { poppinsFont } from "@/app/utils/fonts";
import { loginSchema } from "@/app/utils/validation";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: ({ email, password }) => {
      signIn("credentials", { email, password });
    },
  });
  return (
    <div className="h-screen  w-full flex flex-col items-center justify-center px-10 py-10 lg:px-20 ">
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={formik.handleSubmit}
      >
        <div className="bg-gradient-to-r from-palette-blue  to-black text-transparent bg-clip-text">
          <h1 className={` text-4xl text-center`}>DREAM JOBS</h1>
        </div>
        <h1 className=" text-gray-500 font-extrabold text-xl text-center ">
          Login
        </h1>

        <Input placeholder="Username" {...formik.getFieldProps("email")} />
        <Input
          placeholder="Password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        <button
          className="bg-palette-blue py-4 text-white font-bold rounded-lg"
          type="submit"
        >
          Login
        </button>

        <div className="flex flex-row gap-4 items-center">
          <div className="h-[2px] bg-gray-200 w-full" />
          <h1>or</h1>
          <div className="h-[2px] bg-gray-200 w-full" />
        </div>

        <div className="flex flex-row gap-4 justify-center">
          <button className="shadow-lg p-2 text-white font-bold rounded-lg">
            <Image
              src={googleIcon}
              alt="google account"
              className="h-[40px] w-[50px]"
            />
          </button>
          <button className="shadow-lg p-2 text-white font-bold rounded-lg">
            <Image
              src={facebookIcon}
              alt="google account"
              className="h-[40px] w-[50px]"
            />
          </button>
        </div>

        <p className="mt-8 text-center">
          dont have an account ?{" "}
          <Link href="/auth/signup" className="text-palette-blue dec">
            register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SigninPage;
