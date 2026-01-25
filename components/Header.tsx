import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import SearchBar from "./SearchBar";
import { navLinks } from "@/constants";

const Header = ({
  session,
  isAdmin,
}: {
  session: Session;
  isAdmin: boolean;
}) => {
  return (
    <header className="relative flex flex-row items-start justify-center flex-wrap h-[120px] z-10">
      <div className="mt-12 flex w-full items-center">
        {/* Left */}
        <div className="flex flex-[1] justify-start">
          <Link href="/">
            <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
          </Link>
        </div>

        {/* Center (largest) */}
        <div className="flex flex-[3] justify-center">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex flex-[1] justify-end">
          <ul className="flex items-center gap-8">
            <li>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <div className="flex items-center gap-[80px]">
                  <Button>Logout</Button>

                  {isAdmin && (
                    <Link href="/admin">
                      <Avatar>
                        <AvatarFallback className="bg-amber-100">
                          {getInitials(session?.user?.name || "A")}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  )}
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>

      <div className="z-[1000] w-full flex flex-row justify-between px-10 mt-3">
        {navLinks.map((link, i) => (
          <Link key={i} href={link.href} className="cursor-pointer">
            <p className="z-[1000] text-lg text-white my-2">{link.title}</p>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
