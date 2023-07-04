import { facebookIcon, googleIcon } from "@/app/asserts";
import { Input } from "@/app/components";
import { poppinsFont } from "@/app/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div className="h-screen  w-full px-10 py-10 lg:px-20 overflow-scroll ">
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-gradient-to-r from-palette-blue  to-black text-transparent bg-clip-text">
          <h1
            className={`font-extrabold text-4xl text-center ${poppinsFont.className}`}
          >
            DREAM JOBS
          </h1>
        </div>

        <h1 className=" text-gray-500  text-xl text-center ">signup</h1>
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Middle Name (optional)" />
        <Input placeholder="Password" />
        <Input placeholder="Confirm password" />
        <button className="bg-palette-blue py-4 text-white font-bold rounded-lg">
          Register
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
          already have an account ?{" "}
          <Link href="/auth/signin" className="text-palette-blue dec">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
