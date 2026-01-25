"use client";

import { useSelection } from "@/app/context/receiptSelectionContext";
import { Button } from "@/components/ui/button";
import Search from "@/components/admin/search";

export const ReceiptHeader = () => {
  const { selectedIds, openDeleteModal } = useSelection();

  return (
    <div className="relative w-full h-[70px] flex flex-col md:flex-row justify-center items-center md:gap-5 gap-2 px-10">
      <div className="md:flex-1 md:static md:translate-y-0 absolute top-0 -translate-y-8">
        {selectedIds.length > 0 && (
          <span className="text-sm font-medium text-red-600 animate-in fade-in">
            {selectedIds.length} selected
          </span>
        )}
      </div>
      <Search placeholder="Search receipts..." />
      <div className="flex-1 flex justify-end md:gap-5 gap-1">
        <Button
          variant="destructive"
          disabled={selectedIds.length === 0}
          onClick={() => openDeleteModal("selected")}
        >
          Delete Selected
        </Button>
        <Button
          variant="outline"
          className="border-red-600 text-red-600 hover:bg-red-50"
          onClick={() => openDeleteModal("all")}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};
