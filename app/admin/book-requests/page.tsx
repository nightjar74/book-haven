import BorrowRequestCard from "@/components/borrowRequestCard";
import { getRequests } from "@/lib/actions/data-fetchers";
import React from "react";

const page = async () => {
  let requests: any = [];
  requests = await getRequests();
  return (
    <div className="w-full min-h-[500px] bg-white rounded-xl h-auto p-2 justify-center shadow-lg flex flex-row flex-wrap gap-5 pt-5 pb-5">
      {requests.length > 0 ? (
        requests.map((request: any) => (
          <BorrowRequestCard
            key={request.id}
            title={request.title}
            author={request.author}
            publisher={request.publisher}
            requester={request.userEmail}
          />
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-white shadow-lg">
          <p className="text-slate-500 font-medium">
            No borrow requests found.
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
