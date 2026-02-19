import React from "react";
import Card from "./ui/card";
import { getFilteredUsers, User } from "@/lib/actions/data-fetchers";
import { is } from "drizzle-orm";
import Pagination from "./admin/Pagination";
import { redirect } from "next/navigation";

type Props = {
  data: User[];
};

async function Users({
  query,
  currentPage,
  limit,
}: {
  query?: string;
  currentPage?: number;
  limit: number;
}) {
  const { users: data, totalPages } = await getFilteredUsers(
    query || "",
    currentPage || 1,
    true,
  );

  if (currentPage && data.length > 0) {
    console.log(currentPage, "current page in users comp");
    if (currentPage > totalPages && totalPages > 0) {
      return;
    }
  }

  //console.log(data, "userdata in users comp");
  return (
    <div className="relative md:w-[50%] w-full bg-white rounded-xl h-auto p-2 shadow-lg flex flex-col gap-1 pt-5 pb-[80px] md:pb-0">
      <h2
        data-testid="administrators-header"
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
      >
        Administrators
      </h2>
      {data.length > 0 ? (
        data.map((user) => (
          <Card
            role={user.role}
            key={user.id}
            user={user.full_name}
            email={user.email}
            id={user.id}
          />
        ))
      ) : (
        <div className="text-center p-10">
          <p>No administrators found on this page.</p>
          <a href="/admin?page=1" className="text-blue-500 underline">
            Return to first page
          </a>
        </div>
      )}
      <div className="absolute bottom-5 w-full flex justify-center items-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Users;
