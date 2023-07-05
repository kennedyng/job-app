"use client";

import { facebookIcon, googleIcon } from "@/app/asserts";
import { Input } from "@/app/components";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "react-query";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
interface UserFromType {
  firstName: string;
  lastName: string;
  middleName?: string;
  country: string;
  email: string;
  password: string;
}
const registerNewUser = async (data: UserFromType) => {
  const res = await axios.post("/api/user/register", data);
  return res.data;
};

const SignupPage = () => {
  const registerQuery = useMutation(registerNewUser);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      country: "",
      email: "",
      password: "",
    },

    onSubmit: (
      { firstName, lastName, middleName, country, email, password },
      { resetForm }
    ) => {
      registerQuery.mutate(
        {
          firstName,
          lastName,
          middleName,
          country,
          email,
          password,
        },
        {
          onSuccess: () => {
            resetForm();
          },
        }
      );
    },
  });
  return (
    <div className="h-screen  w-full px-10 py-10 lg:px-20 overflow-scroll ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <div className="bg-gradient-to-r from-palette-blue  to-black text-transparent bg-clip-text">
          <h1 className={`font-extrabold text-4xl text-center `}>DREAM JOBS</h1>
        </div>

        <h1 className=" text-gray-500  text-xl text-center ">signup</h1>
        <Input
          placeholder="First Name"
          {...formik.getFieldProps("firstName")}
        />
        <Input placeholder="Last Name" {...formik.getFieldProps("lastName")} />
        <Input
          placeholder="Middle Name (optional)"
          {...formik.getFieldProps("middleName")}
        />
        <Input placeholder="Country" {...formik.getFieldProps("country")} />
        <Input placeholder="Email" {...formik.getFieldProps("email")} />
        <Input placeholder="Password" {...formik.getFieldProps("password")} />
        <button
          type="submit"
          className="bg-palette-blue py-4 text-white font-bold rounded-lg"
        >
          {registerQuery.isLoading ? "Registering..." : "Register"}
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
      </form>
    </div>
  );
};

export default SignupPage;
