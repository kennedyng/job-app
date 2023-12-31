"use client";
import { facebookIcon, googleIcon } from "@/app/asserts";
import { loginSchema } from "@/app/utils/validationSchema";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SigninPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,
    onSubmit: async ({ email, password }) => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
      }
      if (!res?.error && res?.ok) {
        toast.success("welcome back. find you dream job");
        router.push("/listings");
      }
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

        <TextField
          label="Email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          {...formik.getFieldProps("email")}
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          helperText={Boolean(formik.errors.email) && formik.errors.email}
        />

        <TextField
          label="Password"
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          {...formik.getFieldProps("password")}
          error={
            Boolean(formik.touched.password) && Boolean(formik.errors.password)
          }
          helperText={Boolean(formik.errors.password) && formik.errors.password}
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
