"use client";
import React, { useRef, useTransition, useState } from "react";
import Card from "./ui/card";
import { User } from "@/lib/actions/data-fetchers";
import Pagination from "./admin/Pagination";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/hooks/use-modal";
import { deleteUser } from "@/lib/actions/user-actions";
import ConfirmDeleteModal from "./admin/modals/confirmationDialog";
import { useUserActivity } from "@/app/context/userActivityProvider";

type Props = {
  totalUsers: number;
  limit: number;
  users: any[];
};

function AllUsersContext({ totalUsers, limit, users }: Props) {
  //console.log(totalUsers, limit, "users and limit");
  const { selectedUser, setSelectedUser } = useUserActivity();
  const { isOpen, confirm, handleClose } = useModal();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (user: User) => {
    if (selectedUser.userid === user.id && selectedUser.isSelected) {
      setSelectedUser({
        userid: "",
        isSelected: false,
        name: "",
      });
    } else {
      setSelectedUser({
        userid: user.id,
        isSelected: true,
        name: user.full_name,
      });
    }
  };

  const handleDeleteRequest = async (id: string) => {
    const ok = await confirm();
    if (!ok) return;

    setDeletingId(id);
    //console.log("id for user to be deleted:", id);

    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 1500)); // Simulate delay
      //console.log("ispending", isPending);
      startTransition(() => setDeletingId(null));
      const result = await deleteUser(id);
      startTransition(() => setDeletingId(null));
      if (result.success) {
        toast({ title: "Success", description: "User deleted." });
      } else {
        console.log("Error deleting user:", result.message);
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[500px] max-h-[500px] bg-white rounded-xl p-2 shadow-lg flex flex-col gap-1 pt-5 relative overflow-hidden"
    >
      <ConfirmDeleteModal isOpen={isOpen} onClose={handleClose} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Users
      </h2>
      {users.map((user: any) => (
        <div key={user.id} onClick={() => handleCardClick(user)}>
          <Card
            user={user.full_name}
            email={user.email}
            id={user.id}
            role={user.role}
            onDelete={async (id: string) => await handleDeleteRequest(id)}
            selected={
              selectedUser.userid === user.id && selectedUser.isSelected
                ? "bg-slate-300"
                : "bg-white"
            }
            isDeleting={isPending && deletingId === user.id}
          />
        </div>
      ))}
      <div className="absolute bottom-5 w-full flex justify-center">
        <Pagination totalPages={Math.ceil(totalUsers / limit)} />
      </div>
    </div>
  );
}

export default AllUsersContext;
