import { object, string } from "yup";

export const loginSchema = object({
  userName: string().required("required"),
  password: string().required("required"),
});
