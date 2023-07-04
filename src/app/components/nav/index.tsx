import { navlinks } from "@/app/constants";
import { poppinsFont } from "@/app/utils/fonts";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex flex-row justify-between items-center sticky top-0 bg-white z-20 py-2 px-4  shadow-md lg:px-20  ">
      <Link href="/listings">
        <h1 className={`font-bold text-palette-blue ${poppinsFont.className} `}>
          DREAM JOBS
        </h1>
      </Link>
      <ul className="flex-row gap-10 hidden lg:flex">
        {navlinks.map(({ label, id, link }) => (
          <li>
            <Link
              key={id}
              href={link}
              className="font-extrabold text-base text-gray-600"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/auth/signin" className="active:text-red-400 hidden lg:block">
        <button className="bg-palette-blue px-6 py-3 text-white font-bold rounded-lg">
          Login
        </button>
      </Link>

      <button className="lg:hidden">
        <span className="material-icons-outlined px-6 py-3 bg-palette-blue rounded-lg   text-white">
          menu
        </span>
      </button>
    </nav>
  );
};

export default Nav;
