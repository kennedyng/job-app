"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material";
const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#023047",
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
            border: "2px solid gray",
          },
        },
      },
    },
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Providers;
