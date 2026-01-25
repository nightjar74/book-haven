import * as Dialog from "@radix-ui/react-dialog";
import QuantityForm from "../quantityForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "@/hooks/use-toast";
import { updateBookQuantity } from "@/lib/actions/book";

type Props = {
  book: string;
  totalCopies: number;
  availableCopies: number;
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

const UpdateQuantityModal = ({
  book,
  totalCopies,
  availableCopies,
  isOpen,
  onClose,
}: Props) => {
  const handleUpdate = async (values: {
    totalCopies: number;
    availableCopies: number;
  }) => {
    const result = await updateBookQuantity(book, values);

    if (result.success) {
      toast({
        title: "Inventory Updated",
        description: `Successfully updated copies.`,
      });
      onClose(false);
      return { success: true };
    } else {
      toast({
        title: "Update Failed",
        description: result.error,
        variant: "destructive",
      });
      return { success: false, error: result.error };
    }
  };

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
            <DialogTitle className="text-xl font-bold text-gray-900 mb-4">
              Update Book Inventory
            </DialogTitle>
            <QuantityForm
              defaultValues={{
                totalCopies: totalCopies,
                availableCopies: availableCopies,
              }}
              onSubmit={handleUpdate}
            />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateQuantityModal;
