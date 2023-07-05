"use client";

import { useToggle } from "@/app/hooks";
import { poppinsFont } from "@/app/utils/fonts";
import { getCreatedTime } from "@/app/utils/time";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

interface Props {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  url?: string;
  location?: string;
  remote?: boolean;
  created_at: number;
}

const saveJob = async (jobData: Props) => {
  const res = await axios.put("/api/job/save", jobData);
  return res.data;
};
const JobCard: React.FC<Props> = ({
  company_name,
  title,
  description,
  location,
  created_at,
  remote,
}) => {
  const viewMoreToggle = useToggle();

  const jobQuery = useMutation(saveJob);
  const handleSaveJob = (jobData: Props) => {
    jobQuery.mutate(jobData);
  };
  return (
    <div className="group p-6 flex flex-col gap-8 rounded-lg border-[1px] border-opacity-5 cursor-pointer duration-300 hover:-translate-y-2 hover:shadow-lg md:flex-row ">
      <div className="flex flex-col gap-2 items">
        <h6
          className={`self-start text-palette-blue text-lg font-medium ${poppinsFont.className}`}
        >
          {company_name}
        </h6>
        <h1 className={`text-lg self-start font-medium  `}>{title}</h1>

        <hr />

        <div className="flex flex-col gap-4 justify-between text-gray-600  lg:flex-row">
          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-summer">
              location_on
            </span>
            <span>{location}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-summer">
              schedule
            </span>
            <span>{getCreatedTime(created_at)}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-summer">
              house
            </span>
            {remote ? (
              <span className="text-palette-summer">remote</span>
            ) : (
              <span
                className={`text-palette-blue ${poppinsFont.className} font-semibold`}
              >
                Full time
              </span>
            )}
          </div>
        </div>

        <p
          className={`text-gray-700  text-clip overflow-clip ${
            viewMoreToggle.isToggled ? "h-full" : "h-[100px]"
          } `}
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex justify-between items-center">
          <button
            onClick={viewMoreToggle.actions.toggle}
            className="bg-palette-blue px-4 py-2 flex flex-row gap-1 items-center text-white font-bold"
          >
            <span>{viewMoreToggle.isToggled ? "close" : "Details"}</span>
          </button>
          <button
            onClick={() => handleSaveJob}
            className="flex flex-col text-gray-600"
          >
            <span className="material-icons-outlined">favorite_border</span>
            <span className="text-xs ">
              {jobQuery.isLoading ? "saving..." : "save"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
