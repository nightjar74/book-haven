"use server";
import { UserActivityProvider } from "@/app/context/userActivityProvider";
import AllUsersContext from "@/components/allUsers";
import BorrowedWithActivity from "@/components/borrowedWithActivity";
import { getFilteredUsers, getUsersCount } from "@/lib/actions/data-fetchers";
import { redirect } from "next/navigation";
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

  if (currentPage < 1) {
    redirect(`/admin/users?page=1`);
  }

  let { users: userData, totalPages: totalUsers } = await getFilteredUsers(
    query,
    currentPage,
  );
  try {
    const data = await Promise.all([getUsersCount(query)]);

    [totalUsers] = data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch dashboard data");
  }

  const totalPages = Math.ceil(totalUsers / limit);
  if (currentPage > totalPages && totalPages > 0) {
    redirect(`/admin/users?page=${totalPages}`);
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
