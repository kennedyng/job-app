import React from "react";
import { meetingImg } from "../asserts";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}
const layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex w-full lg:w-3/4">{children}</div>
      <div className="relative w-full  flex-row items-center justify-center  hidden lg:flex ">
        <div className="absolute top-0 left-0 h-full w-4/4 bg-gradient-to-tr   from-palette-blue flex flex-col gap-4 justify-center  px-20">
          <h1 className="font-extrabold text-3xl text-white  ">
            FIND YOUR DREAM JOB
          </h1>
          <p className="text-white font-bold">
            register to apply for your dream job Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolores debitis expedita labore harum
            dolorum molestias praesentium est quod voluptas. Nostrum vero eum
            consequuntur doloribus mollitia totam corrupti rerum enim amet.
          </p>
        </div>
        <Image
          src={meetingImg}
          alt=""
          priority
          className="h-[100%] w-[100%] "
        />
      </div>
    </div>
  );
};

export default layout;
