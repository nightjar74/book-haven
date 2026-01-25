"use server";
import { UserActivityProvider } from "@/app/context/userActivityProvider";
import AllUsersContext from "@/components/allUsers";
import BorrowedWithActivity from "@/components/borrowedWithActivity";
import { getFilteredUsers, getUsersCount } from "@/lib/actions/data-fetchers";
import React from "react";

async function AllUsers(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const queryParams = await props.searchParams;
  const query = queryParams?.query || "";
  const currentPage = queryParams?.page ? parseInt(queryParams.page) : 1;
  const limit = 4;
  let userData: any[] = await getFilteredUsers(query, currentPage);
  let totalUsers = 0;
  try {
    const data = await Promise.all([getUsersCount(query)]);

    [totalUsers] = data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch dashboard data");
  }

  return (
    <div className="flex flex-col gap-5">
      <UserActivityProvider>
        <AllUsersContext
          users={userData}
          totalUsers={totalUsers}
          limit={limit}
        />
        <BorrowedWithActivity />
      </UserActivityProvider>
    </div>
  );
}

export default AllUsers;
