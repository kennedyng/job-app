import { object, string } from "yup";

export const loginSchema = object({
  email: string().required("required").trim(),
  password: string().required("required"),
});
