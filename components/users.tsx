import React from "react";
import Card from "./ui/card";
import { getFilteredUsers, User } from "@/lib/actions/data-fetchers";
import { is } from "drizzle-orm";
import Pagination from "./admin/Pagination";

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
  const data = await getFilteredUsers(query || "", currentPage || 1, true);
  //console.log(data, "userdata in users comp");
  return (
    <div className="relative md:w-[50%] w-full bg-white rounded-xl h-auto p-2 shadow-lg flex flex-col gap-1 pt-5 pb-[80px] md:pb-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Administrators
      </h2>
      {data &&
        data.map((user) => (
          <Card
            role={user.role}
            key={user.id}
            user={user.full_name}
            email={user.email}
            id={user.id}
          />
        ))}
      <div className="absolute bottom-5 w-full flex justify-center items-center">
        <Pagination totalPages={Math.ceil(data.length / limit)} />
      </div>
    </div>
  );
}

export default Users;
