"use client";
import { facebookIcon, googleIcon } from "@/app/asserts";
import { registerSchema } from "@/app/utils/validationSchema";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import LockIcon from "@mui/icons-material/Lock";
import {
  Alert,
  AlertTitle,
  Collapse,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
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

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      country: "",
      email: "",
      password: "",
    },

    validationSchema: registerSchema,
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
            router.push("/auth/signin");
            toast.success("successfully registered. login to continue");
            resetForm();
          },

          onError: () => {
            toast.error("something went rong");
          },
        }
      );
    },
  });
  return (
    <>
      <div className="h-screen  w-full px-10 py-10 lg:px-20 overflow-scroll ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="bg-gradient-to-r from-palette-blue  to-black text-transparent bg-clip-text">
            <h1 className={`font-extrabold text-4xl text-center `}>
              DREAM JOBS
            </h1>
          </div>

          {registerQuery.isError && (
            <Alert severity="error">
              <AlertTitle>Authentication Eroor</AlertTitle>
              <strong>Email Already taken by someone else</strong>. use a
              diffrent email
            </Alert>
          )}

          <h1 className=" text-gray-500  text-xl text-center ">signup</h1>
          <TextField
            label="First Name"
            {...formik.getFieldProps("firstName")}
            error={
              Boolean(formik.touched.firstName) &&
              Boolean(formik.errors.firstName)
            }
            helperText={
              Boolean(formik.errors.firstName) && formik.errors.firstName
            }
          />
          <TextField
            label="Last Name"
            {...formik.getFieldProps("lastName")}
            error={
              Boolean(formik.touched.lastName) &&
              Boolean(formik.errors.lastName)
            }
            helperText={
              Boolean(formik.errors.lastName) && formik.errors.lastName
            }
          />
          <TextField
            label="Middle Name (optional)"
            {...formik.getFieldProps("middleName")}
            error={
              Boolean(formik.touched.middleName) &&
              Boolean(formik.errors.middleName)
            }
            helperText={
              Boolean(formik.errors.middleName) && formik.errors.middleName
            }
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <FlagIcon />
                </InputAdornment>
              ),
            }}
            label="Country"
            {...formik.getFieldProps("country")}
            error={
              Boolean(formik.touched.country) && Boolean(formik.errors.country)
            }
            helperText={Boolean(formik.errors.country) && formik.errors.country}
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            label="Email"
            {...formik.getFieldProps("email")}
            error={
              Boolean(formik.touched.email) && Boolean(formik.errors.email)
            }
            helperText={Boolean(formik.errors.email) && formik.errors.email}
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            label="Password"
            {...formik.getFieldProps("password")}
            error={
              Boolean(formik.touched.password) &&
              Boolean(formik.errors.password)
            }
            helperText={
              Boolean(formik.errors.password) && formik.errors.password
            }
          />
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
    </>
  );
};

export default SignupPage;
