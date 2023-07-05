import { meetingImg } from "@/app/asserts";
import { poppinsFont } from "@/app/utils/fonts";
import { getCreatedTime } from "@/app/utils/time";
import DOMPurify from "dompurify";
import moment from "moment";
import Image from "next/image";
import React from "react";

interface Props {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  url?: string;
  location?: string;
  created_at: number;
}
const JobCard: React.FC<Props> = ({
  slug,
  company_name,
  title,
  description,
  url,
  location,
  created_at,
}) => {
  return (
    <div className="group p-6 flex flex-col gap-8 rounded-lg border-[1px] border-opacity-5 cursor-pointer duration-300 hover:-translate-y-2 hover:shadow-lg md:flex-row ">
      <div className="flex flex-col gap-2 items">
        <h6 className="self-start text-palette-blue">{company_name}</h6>
        <h1 className={`text-lg self-start font-medium `}>{title}</h1>

        <hr />

        <div className="flex flex-col gap-4 justify-between text-gray-600  lg:flex-row">
          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-blue">
              location_on
            </span>
            <span>{location}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-blue">
              schedule
            </span>
            <span>{getCreatedTime(created_at)}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-blue">
              event
            </span>
            <span>Zambia, luska</span>
          </div>
        </div>

        <p
          className="text-gray-500 text-start h-[200px] text-clip overflow-hidden "
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />

        <div className="flex justify-between items-center">
          <button className="bg-palette-blue px-4 py-2 flex flex-row gap-1 items-center text-white font-bold">
            <span>View</span>
          </button>
          <button className="flex flex-col text-gray-600">
            <span className="material-icons-outlined">favorite_border</span>
            <span className="text-xs ">save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
