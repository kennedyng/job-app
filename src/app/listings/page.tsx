"use client";

import React from "react";
import { Filter, JobCard } from "../components";
import { useInfiniteQuery, useQuery } from "react-query";
import { ClimbingBoxLoader, MoonLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";

async function getJobs(pageParam: number) {
  const res = await fetch(`/api/jobs?page=${pageParam}`);
  const users = await res.json();
  return users;
}

const JobListing = () => {
  const jobsQuery = useInfiniteQuery({
    queryKey: ["hydrate-users"],
    queryFn: ({ pageParam = 0 }) => getJobs(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return 2;
    },
  });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      jobsQuery.fetchNextPage();
    }
  }, [inView]);

  let content = null;

  if (jobsQuery.isLoading) {
    content = (
      <div className="h-full w-full flex items-center justify-center">
        <MoonLoader color="#0A6EBD" />
      </div>
    );
  }

  if (jobsQuery.isSuccess) {
    content = (
      <div className="px-20 py-10 flex flex-col gap-10">
        {jobsQuery.data?.pages.map((page: any, index: number) => (
          <React.Fragment key={"page-" + index}>
            {page?.data?.data?.map((job: any) => (
              <JobCard
                key={job.slug}
                slug={job.slug}
                title={job.title}
                created_at={job.created_at}
                description={job.description}
                company_name={job.company_name}
                location={job.location}
              />
            ))}
          </React.Fragment>
        ))}
        {jobsQuery.isFetchingNextPage && <div>Loading ...</div>}
        <div ref={ref}></div>
      </div>
    );
  }

  return (
    <main className="flex flex-row">
      <Filter />
      <div className="absolute right-0 top-0 pt-[58px] w-full h-screen overflow-y-auto lg:w-[75%]">
        {content}
      </div>
    </main>
  );
};

export default JobListing;
