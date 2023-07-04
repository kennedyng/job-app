"use client";

import { useToggle } from "@/app/hooks";
import React from "react";
import Input from "../input";
import Image from "next/image";
import { meetingImg } from "@/app/asserts";
import { useFormik } from "formik";

const FilterContent = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  return (
    <div className="p-10">
      <h1 className="font-bold text-xl"> filter</h1>
      <form onSubmit={formik.handleSubmit}>
        <h1 className="font-bold my-4 text-gray-500">Location</h1>
        <div className="flex flex-row gap-2">
          <Input type="checkbox" />
          Remote
        </div>

        <div className="flex flex-row gap-2">
          <Input type="checkbox" />
          Remote
        </div>
        <div className="flex flex-row gap-2">
          <Input type="checkbox" />
          Remote
        </div>

        <h1 className="font-bold my-4 text-gray-500">Employment Type</h1>
        <div className="flex flex-row gap-2">
          <Input type="checkbox" />
          part time
        </div>

        <div className="flex flex-row gap-2">
          <Input type="checkbox" />
          full time
        </div>
        <div className="flex flex-row gap-2">
          <Input type="checkbox" />
          Remote
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <button
            onClick={formik.handleReset}
            className="bg-palette-blue px-4 py-1 rounded-3xl text-white my-4"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-palette-blue px-4 py-1 rounded-3xl text-white my-4"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
const Filter = () => {
  const filterToggle = useToggle();
  return (
    <>
      <div
        className={`absolute left-0 top-0 pt-[58px] h-screen bg-white z-10  bg-opacity-5 backdrop-blur-md w-full duration-500 lg:hidden ${
          !filterToggle.isToggled ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <button
          className="absolute -right-5 top-1/2 "
          onClick={filterToggle.actions.open}
        >
          <span className="material-icons-outlined bg-palette-beige py-5  rounded-r-full">
            chevron_right
          </span>
        </button>

        <button
          className="absolute  right-3 mt-4"
          onClick={filterToggle.actions.close}
        >
          <span className="material-icons-outlined p-2 bg-palette-blue rounded-full text-white">
            close
          </span>
        </button>
        <FilterContent />
      </div>

      <div
        className={`absolute border-r-2 left-0 top-0 pt-[58px] h-screen  z-10 hidden lg:flex lg:w-[25%]  duration-500 `}
      >
        <FilterContent />
      </div>
    </>
  );
};

export default Filter;
