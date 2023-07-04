import { Inter, Poppins } from "next/font/google";

export const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const interFont = Inter({
  subsets: ["latin"],
});
