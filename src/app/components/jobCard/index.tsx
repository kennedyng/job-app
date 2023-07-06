"use client";
import { useToggle } from "@/app/hooks";
import { poppinsFont } from "@/app/utils/fonts";
import { getCreatedTime } from "@/app/utils/time";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useMutation } from "react-query";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

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
  const res = await axios.post("/api/job/save", jobData);
  return res.data;
};
const JobCard: React.FC<Props> = ({
  slug,
  company_name,
  title,
  description,
  location,
  created_at,
  remote,
}) => {
  const viewMoreToggle = useToggle();

  const { status } = useSession();
  const theme = useTheme();
  const jobQuery = useMutation(saveJob, {
    onSuccess: (data) => {
      toast.info("job saved successfully");
    },
    onError: () => {
      toast.error("something went wrong failed to save");
    },
  });

  interface JobType extends Props {
    userId: number | string;
  }
  const handleSaveJob = (jobData: JobType) => {
    jobQuery.mutate(jobData);
  };
  return (
    <>
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
            className={`text-gray-700  text-clip overflow-clip  my-2 ${
              viewMoreToggle.isToggled ? "h-full" : "h-[100px]"
            } `}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="flex flex-row gap-4 items-center">
            <button
              onClick={viewMoreToggle.actions.toggle}
              className="bg-palette-blue px-4 py-2 flex flex-row gap-1 items-center text-white font-bold"
            >
              <span>{viewMoreToggle.isToggled ? "close" : "Details"}</span>
            </button>

            <button className="bg-palette-summer px-4 py-2 flex flex-row gap-1 items-center text-white font-bold">
              <Link href={`/listings/application/${slug}`}>
                <span>Apply</span>
              </Link>
            </button>

            <button
              onClick={() =>
                handleSaveJob({
                  slug,
                  company_name,
                  title,
                  description,
                  location,
                  created_at,
                  remote,
                  userId: 1,
                })
              }
              className={`flex flex-row items-center gap-4 text-gray-600 ${
                status === "authenticated" ? "visible" : "invisible"
              }`}
            >
              <div className="flex flex-col">
                <span className="material-icons-outlined">favorite_border</span>
                <span className="text-xs">save</span>
              </div>

              <PuffLoader
                color={theme.palette.error.main}
                loading={jobQuery.isLoading}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
