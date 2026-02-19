import React from "react";
import { lazy, Suspense } from "react";
import Users from "@/components/users";
import ErrorBoundary from "@/components/errors/error-boundary";
import { SkeletonChart, SkeletonLoader } from "./skeletons";
import { redirect } from "next/navigation";

const BarChart = lazy(() => import("@/components/ui/LineChart"));

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    year?: string;
    page?: string;
  }>;
}) => {
  const queryParams = await props.searchParams;
  const query = queryParams?.query || "";
  const currentPage = queryParams?.page ? parseInt(queryParams.page) : 1;
  const limit = 7;

  if (currentPage < 1) {
    redirect(`/admin?page=1`);
  }

  return (
    <div className="relative flex flex-col md:flex-row gap-4 w-full">
      <ErrorBoundary
        fallback={
          <div className="w-[50%] h-[594px] p-4 bg-red-50 text-red-500 flex items-center justify-center">
            Failed to load users.
          </div>
        }
      >
        <Suspense fallback={<SkeletonLoader />}>
          <Users query={query} currentPage={currentPage} limit={limit} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary
        fallback={
          <div className="w-[50%] h-[594px] p-4 bg-red-50 text-red-500 flex items-center justify-center">
            Failed to load chart data.
          </div>
        }
      >
        <Suspense fallback={<SkeletonChart />}>
          <BarChart searchParams={props.searchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
export default Page;
