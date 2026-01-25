"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./button";
import { Avatar, AvatarFallback } from "./avatar";
import { getInitials } from "@/lib/utils";
import { EllipsisVertical, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type Props = {
  user: string;
  email: string;
  id: string;
  selected?: string;
  role?: "USER" | "ADMIN" | null;
  onDelete?: (id: string) => Promise<void>;
  isDeleting?: boolean;
};

function Card({
  user,
  email,
  id,
  role,
  selected,
  onDelete,
  isDeleting,
}: Props) {
  return (
    <div
      className={`flex items-start justify-center rounded-[24px] ${selected} p-2 border-[1px] border-gray-100 md:hover:bg-slate-200 md:transition-transform duration-300 ease-in-out md:transform md:hover:-translate-y-0.5`}
    >
      <div className="relative w-full h-[50px] flex items-center justify-between md:pr-5 pr-2">
        <div className="flex flex-row justify-center items-center pl-2 md:gap-4 gap-2">
          <Avatar>
            <AvatarFallback>{getInitials(user)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center h-full">
            <p className="font-semibold text-dark-200 text-xs md:text-lg">
              {user}
            </p>
            <p className="text-xs text-light-500">{email}</p>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          {role === "USER" || !role ? (
            <Button
              variant={"destructive"}
              disabled={isDeleting}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(id);
              }}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          ) : (
            <div />
          )}
        </div>
        <div className="flex md:hidden items-center justify-center">
          {role === "USER" || !role ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive flex items-center justify-center"
                  /*                   onSelect={async () => {
                    try {
                      //await deleteUser(id);
                      alert("User deleted");
                    } catch (error) {
                      console.error("Failed to delete", error);
                    }
                  }} */
                >
                  <Button
                    variant={"ghost"}
                    disabled={isDeleting}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(id);
                    }}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

const MemoizedCard = React.memo(Card);

export default MemoizedCard;
