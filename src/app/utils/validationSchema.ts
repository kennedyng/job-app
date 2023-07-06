import { object, string } from "yup";

const email = string()
  .required("required")
  .email("please provide correct email formart")
  .min(2, "must contain atleast two characters")
  .max(100, "must not contain more than 20 characters");

const password = string()
  .required("No password provided.")
  .min(8, "Password is too short - should be 8 chars minimum.")
  .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

const name = string()
  .required("Required")
  .min(2, "must contain atleast two characters")
  .max(20, "must not contain more than 20 characters")
  .trim();
export const loginSchema = object({
  email,
  password,
});

export const registerSchema = object({
  firstName: name,
  lastName: name,
  middleName: string()
    .nullable("optional")
    .min(2, "must contain atleast two characters")
    .max(20, "must not contain more than 20 characters")
    .trim(),
  country: name,
  email,
  password,
});

export const applicationSchema = object({
  firstName: name,
  lastName: name,
  email,
  country: name,
  resume: string().required("required"),
  coverLetter: string().nullable(),
});
