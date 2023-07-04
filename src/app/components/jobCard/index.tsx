import { meetingImg } from "@/app/asserts";
import { poppinsFont } from "@/app/utils/fonts";
import Image from "next/image";
import React from "react";

const JobCard = () => {
  return (
    <div className="group p-6 flex flex-col gap-8 rounded-lg border-[1px] border-opacity-5 cursor-pointer duration-300 hover:-translate-y-2 hover:shadow-lg md:flex-row ">
      <Image
        src={meetingImg}
        alt=""
        className="h-[100px] w-[100px] rounded-full self-center"
      />
      <div className="flex flex-col gap-2 items">
        <h6 className="self-start text-palette-blue">Linear Company</h6>
        <h1 className={`text-xl self-start font-medium `}>Software Engineer</h1>

        <hr />

        <div className="flex flex-col gap-4 justify-between text-gray-600  lg:flex-row">
          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-blue">
              location_on
            </span>
            <span>Zambia, luska</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-blue">
              schedule
            </span>
            <span>Zambia, luska</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="material-icons-outlined text-palette-blue">
              event
            </span>
            <span>Zambia, luska</span>
          </div>
        </div>

        <p className="text-gray-500 text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          labore. Architecto minus aliquam quo. Commodi iste porro deserunt
          reprehenderit corporis quia eos magni corrupti iure neque vel
          mollitia, dolore saepe.
        </p>

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
