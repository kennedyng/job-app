"use client";

import React from "react";
import { Filter, JobCard } from "../components";
import { useQuery } from "react-query";

async function getJobs() {
  const res = await fetch("/api/jobs");
  const users = await res.json();
  return users;
}

const JobListing = () => {
  const jobsQuery = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getJobs(),
  });

  return (
    <main className="flex flex-row">
      <Filter />
      <div className="absolute right-0 top-0 pt-[58px] w-full h-screen overflow-y-auto lg:w-[75%]">
        <div className="px-20 py-10 flex flex-col gap-10">
          {jobsQuery.data?.data?.data?.map((job: any) => (
            <JobCard key={job.slug} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default JobListing;
