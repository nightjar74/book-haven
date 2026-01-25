"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { navLinks } from "@/constants";
import { Session } from "next-auth";
import SearchBar from "./SearchBar";
import { handleSignOut } from "@/lib/actions/handleSignOut";

const MobileHeader = ({
  session,
  isAdmin,
}: {
  session: Session;
  isAdmin: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex md:hidden flex-col w-full pb-0 px-4 gap-4 bg-transparent">
      <div className="flex flex-row justify-between items-center w-full z-50">
        <div className="flex flex-row items-center gap-x-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size="icon" className="text-black">
                <Menu style={{ width: 30, height: 30 }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white">
              <SheetTitle className="mb-4">Menu</SheetTitle>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <Link
                    onClick={() => setIsOpen(false)}
                    key={i}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* 2. Logo (Center) */}
          <Link href="/">
            <Image src="/icons/logo.svg" alt="logo" width={32} height={32} />
          </Link>
        </div>

        <div className="flex items-center gap-x-6">
          <form action={handleSignOut}>
            <Button>Log out</Button>
          </form>

          {isAdmin && (
            <Link href="/admin">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-amber-100 text-md">
                  {getInitials(session?.user?.name || "A")}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center">
        <SearchBar />
      </div>
    </div>
  );
};

export default MobileHeader;
