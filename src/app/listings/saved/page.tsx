"use client";
import { JobCard } from "@/app/components";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";
const getSavedJob = async (userId: number) => {
  console.log(userId);
  const res = await axios.get(`/api/jobs/saved?userId=${userId}`);
  return res.data;
};

const SavedJobs = () => {
  const { data } = useSession();
  const savedJobsQuery = useQuery({
    queryFn: () => getSavedJob(Number(1)),
    queryKey: ["saved_jobs"],
  });

  return (
    <div className="px-8  py-10 lg:px-40">
      <div className="flex flex-col gap-8">
        {savedJobsQuery.data?.savedJobs.map((job: any) => (
          <JobCard
            key={job.slug}
            slug={job.slug}
            title={job.title}
            created_at={job.created_at}
            description={job.description}
            company_name={job.company_name}
            location={job.location}
            remote={job.remote}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
