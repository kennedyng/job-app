"use client";

import { navlinks } from "@/app/constants";
import { poppinsFont } from "@/app/utils/fonts";
import { Skeleton } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavContent = () => {
  const { status, data } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  if (status === "authenticated") {
    return (
      <>
        <div className="flex-row  items-center gap-24 hidden lg:flex">
          <ul className={`flex flex-row gap-10 `}>
            {navlinks.map(({ label, id, link }) => (
              <li key={id}>
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

          <div className="flex flex-row gap-4 items-center">
            <span className="text-palette-sea font-light">
              {data?.user?.email ?? "no email"}
            </span>

            <button
              onClick={handleSignOut}
              className="bg-palette-blue px-6 py-3 text-white font-bold rounded-lg"
            >
              sign out
            </button>
          </div>
        </div>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <Link href="/auth/signin">
        <button className="bg-palette-blue px-6 py-3 text-white font-bold rounded-lg">
          signin
        </button>
      </Link>
    );
  }

  return <Skeleton variant="rectangular" width={100} height={30} />;
};

const Nav = () => {
  const { status } = useSession();

  console.log("status", status);
  return (
    <nav className="flex flex-row justify-between items-center sticky top-0 bg-white z-20 py-2 px-4  shadow-md lg:px-20  ">
      <Link href="/">
        <h1 className={`font-bold text-palette-blue ${poppinsFont.className} `}>
          DREAM JOBS
        </h1>
      </Link>
      <NavContent />

      <button className="lg:hidden">
        <span className="material-icons-outlined px-6 py-3 bg-palette-blue rounded-lg   text-white">
          menu
        </span>
      </button>
    </nav>
  );
};

export default Nav;
