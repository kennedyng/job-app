import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.arbeitnow.com",
  timeout: 1000,
});
