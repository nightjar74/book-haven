"use client";

import { useSelection } from "@/app/context/receiptSelectionContext";
import { Receipts } from "@/types";
import React from "react";
//import { Checkbox } from "@/components/ui/checkbox";

type ReceiptCardProps = {
  allReceipts: Receipts[];
};

const ReceiptsCard = ({ allReceipts }: ReceiptCardProps) => {
  const { selectedIds, toggleSelection } = useSelection();

  return (
    <div className="md:mx-5 w-full flex flex-wrap flex-row gap-5 justify-center">
      {allReceipts.length > 0 ? (
        allReceipts.map((receipt) => {
          const isSelected = selectedIds.includes(receipt.id);
          return (
            <div
              key={receipt.id}
              onClick={() => toggleSelection(receipt.id)}
              className={`relative flex flex-col border-2 p-4 rounded-lg cursor-pointer transition-all duration-200 w-[220px] h-[280px] md:min-w-[250px] md:w-[250px] md:min-h-[350px] md:h-[350px] ${
                isSelected
                  ? "border-green-600 bg-green-50 shadow-md scale-[1.02]"
                  : "border-transparent bg-green-100 hover:border-green-300"
              }`}
            >
              <div className="absolute top-4 right-4">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    isSelected
                      ? "bg-green-600 border-green-600"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>

              <h3 className="font-bold text-dark-100 md:text-lg text-sm pr-6">
                {receipt.bookTitle}
              </h3>

              <div className="mt-2 space-y-1 md:text-sm text-xs text-light-500">
                <p>
                  <span className="font-semibold text-dark-200">User:</span>{" "}
                  {receipt.userName}
                </p>
                <p>
                  <span className="font-semibold text-dark-200">Email:</span>{" "}
                  {receipt.userEmail}
                </p>
                <p>
                  <span className="font-semibold text-dark-200">Date:</span>{" "}
                  {new Date(receipt.createdAt!).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-auto pt-2 border-t border-dashed border-light-300">
                <p className="md:text-[10px] text-[7px] uppercase tracking-widest text-slate-700">
                  Receipt ID: {receipt.id.slice(0, 8)}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-light-500 w-full text-center py-10">
          No borrow receipts found.
        </p>
      )}
    </div>
  );
};

export default ReceiptsCard;
