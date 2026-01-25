"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title?: string;
  description?: string;
};

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this user? This action cannot be undone.",
}: Props) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(false);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Content
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl 
              data-[state=open]:animate-in 
              data-[state=open]:fade-in 
              data-[state=open]:zoom-in-95 
              data-[state=closed]:animate-out 
              data-[state=closed]:fade-out 
              data-[state=closed]:zoom-out-95 
              duration-200 ease-out"
          >
            <Dialog.Title className="text-xl font-bold text-gray-900">
              {title}
            </Dialog.Title>

            <Dialog.Description className="mt-3 text-sm text-gray-500 leading-relaxed">
              {description}
            </Dialog.Description>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => onClose(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={() => onClose(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Delete
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
