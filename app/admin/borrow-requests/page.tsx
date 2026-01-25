import React from "react";
import ReceiptsCard from "@/components/admin/receipts";
import { getReceipts, getReceiptsCount } from "@/lib/actions/data-fetchers";
import { SelectionProvider } from "@/app/context/receiptSelectionContext";
import { ReceiptHeader } from "@/components/admin/receiptHeader";
import Pagination from "@/components/admin/Pagination";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const queryParams = await props.searchParams;
  const query = queryParams?.query || "";
  const currentPage = queryParams?.page ? parseInt(queryParams.page) : 1;
  //console.log("Query:", query, "Page:", currentPage);
  const limit = 10;

  const [allReceipts, totalCount] = await Promise.all([
    getReceipts(query, currentPage, limit),
    getReceiptsCount(query),
  ]);

  return (
    <SelectionProvider>
      <div className="w-full min-h-[500px] px-10 bg-white rounded-xl h-auto md:p-2 py-8 shadow-lg flex flex-row flex-wrap gap-5">
        <ReceiptHeader />
        <ReceiptsCard allReceipts={allReceipts} />
        <div className="relative w-full bottom-0 flex justify-center items-end mb-2">
          <Pagination totalPages={Math.ceil(totalCount / limit)} />
        </div>
      </div>
    </SelectionProvider>
  );
};

export default Page;
