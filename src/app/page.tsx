"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { robot } from "./asserts";

export default function Home() {
  const data = useSession();
  return (
    <main className="min-h-screen w-full p-24 flex flex-col justify-center items-center  f">
      <div className="text-5xl text-gray-700">FIND YOUR DREAM JOB</div>
      <p className="text-gray-500 text-center mt-4 w-[500px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestias
        voluptatibus veniam rem nisi alias nostrum omnis ad delectus consectetur
        temporibus nulla, distinctio corporis pariatur? Nostrum eius cupiditate
        dolorem facilis.
      </p>

      <Image src={robot} alt="" className="h-[300px] w-[300px] my-8" />

      <div className="flex flex-row gap-8 items-center">
        <Link href="/listings">
          <button className="bg-palette-summer text-white py-4 px-8 rounded-lg hover:bg-palette-summer duration-200">
            Jobs Listing
          </button>
        </Link>
        <Link href="/auth/signin">
          <button className="border-2 border-palette-blue text-palette-blue py-4 px-8 rounded-lg hover:bg-palette-blue hover:text-white duration-200">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
