"use client";

import React, { createContext, useContext, useState } from "react";
import ConfirmDeleteModal from "@/components/admin/modals/confirmationDialog";
import {
  clearAllReceipts,
  deleteSelectedReceipts,
} from "@/lib/actions/receipts";
import { toast } from "@/hooks/use-toast";

type SelectionContextType = {
  selectedIds: string[];
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  openDeleteModal: (mode: "selected" | "all") => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
);

export const SelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "selected" | "all";
  }>({
    isOpen: false,
    mode: "selected",
  });

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const openDeleteModal = (mode: "selected" | "all") => {
    if (mode === "selected" && selectedIds.length === 0) return;
    setModalState({ isOpen: true, mode });
  };

  const handleConfirmDelete = async (confirmed: boolean) => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (!confirmed) return;

    try {
      let result;
      if (modalState.mode === "all") {
        result = await clearAllReceipts();
      } else {
        result = await deleteSelectedReceipts(selectedIds);
      }

      if (result.success) {
        toast({
          title:
            modalState.mode === "all"
              ? "All receipts cleared"
              : "Receipts deleted",
        });
        setSelectedIds([]);
      } else {
        toast({ title: "Something went wrong", description: result.error });
      }
    } catch (err) {
      toast({ title: "A network error occurred" });
    }
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedIds,
        toggleSelection,
        clearSelection: () => setSelectedIds([]),
        openDeleteModal,
      }}
    >
      {children}
      <ConfirmDeleteModal
        isOpen={modalState.isOpen}
        onClose={handleConfirmDelete}
        title={
          modalState.mode === "all" ? "Clear All Receipts" : "Delete Selected"
        }
        description={
          modalState.mode === "all"
            ? "Are you sure you want to delete EVERY receipt in the database?"
            : `Are you sure you want to delete ${selectedIds.length} selected receipt(s)?`
        }
      />
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context)
    throw new Error("useSelection must be used within SelectionProvider");
  return context;
};
