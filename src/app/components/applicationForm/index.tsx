"use client";

import { applicationSchema } from "@/app/utils/validationSchema";
import {
  Alert,
  AlertTitle,
  InputAdornment,
  Snackbar,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";

import EmailIcon from "@mui/icons-material/Email";
import { useMutation } from "react-query";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface ApplicationType {
  job_slug: string;
  coverLetter?: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  userId: string | number;
}
const sendApplication = async (data: ApplicationType) => {
  const res = await axios.post("/api/job/apply", data);
  return res.data;
};
const ApplicationForm = () => {
  const { id: jobSlug } = useParams();

  const { data } = useSession();
  const { userData } = data?.user;

  console.log(jobSlug);
  const applicationQuery = useMutation(sendApplication);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      resume: "",
      email: "",
      coverLetter: "",
    },

    validationSchema: applicationSchema,
    onSubmit: (
      { firstName, lastName, country, email, coverLetter },
      { resetForm }
    ) => {
      applicationQuery.mutate(
        {
          job_slug: jobSlug,
          firstName,
          lastName,
          email,
          country,
          coverLetter,
          userId: Number(data?.user?.userData?.id),
        },
        {
          onSuccess: (data) => {
            resetForm();
          },
          onError: (data) => {
            toast.error("something went wrong", {
              position: "bottom-left",
            });
          },
        }
      );
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full lg:w-[600px] flex flex-col gap-4"
      >
        <div>
          <div className="py-4">
            <div
              className={`${applicationQuery.isSuccess ? "block" : "hidden"}`}
            >
              <Alert>
                <AlertTitle>Application Success</AlertTitle>
                you have successfully applied for the job
              </Alert>
            </div>

            <div className={`${applicationQuery.isError ? "block" : "hidden"}`}>
              <Alert severity="warning">
                <AlertTitle>Application Error</AlertTitle>
                you can not send more than two application on one job
              </Alert>
            </div>
          </div>
          <h1 className="text-2xl text-palette-blue">Application form</h1>
          <p className="text-gray-700 mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut,
            possimus harum reiciendis nobis quaerat vero facere ad itaque
            veritatis neque perspiciatis perferendis provident aut doloremque.
            Hic consequatur labore ex ea!
          </p>
        </div>
        <div className="grid grid-cols-1   lg:grid-cols-2 gap-4">
          <TextField
            variant="filled"
            label="first name"
            fullWidth
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
            variant="filled"
            label="last name"
            fullWidth
            {...formik.getFieldProps("lastName")}
            error={
              Boolean(formik.touched.lastName) &&
              Boolean(formik.errors.lastName)
            }
            helperText={
              Boolean(formik.errors.lastName) && formik.errors.lastName
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <TextField
            variant="filled"
            label="email"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps("email")}
            error={
              Boolean(formik.touched.email) && Boolean(formik.errors.email)
            }
            helperText={Boolean(formik.errors.email) && formik.errors.email}
          />
          <TextField
            variant="filled"
            label="country"
            fullWidth
            {...formik.getFieldProps("country")}
            error={
              Boolean(formik.touched.country) && Boolean(formik.errors.country)
            }
            helperText={Boolean(formik.errors.country) && formik.errors.country}
          />
          <TextField
            variant="filled"
            label="resume"
            fullWidth
            {...formik.getFieldProps("resume")}
            error={
              Boolean(formik.touched.resume) && Boolean(formik.errors.resume)
            }
            helperText={Boolean(formik.errors.resume) && formik.errors.resume}
          />

          <TextField
            multiline
            minRows={4}
            variant="filled"
            label="cover letter (opotional)"
            fullWidth
            {...formik.getFieldProps("coverLetter")}
            error={
              Boolean(formik.touched.coverLetter) &&
              Boolean(formik.errors.coverLetter)
            }
            helperText={
              Boolean(formik.errors.coverLetter) && formik.errors.coverLetter
            }
          />
        </div>

        <button
          type="submit"
          className="flex flex-row items-center gap-2 bg-palette-blue text-white py-4 px-8 lg:self-end duration-200"
        >
          Send
          <PuffLoader
            color="#fff"
            size={20}
            loading={applicationQuery.isLoading}
          />
        </button>
      </form>
    </>
  );
};

export default ApplicationForm;
