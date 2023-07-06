import ApplicationForm from "@/app/components/applicationForm";
import { IconButton, TextField } from "@mui/material";
import React from "react";

const Application = () => {
  return (
    <div className="px-8 flex flex-col items-center py-10">
      <ApplicationForm />
    </div>
  );
};

export default Application;
