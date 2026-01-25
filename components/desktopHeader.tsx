import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import SearchBar from "./SearchBar";
import { navLinks } from "@/constants";
import { handleSignOut } from "@/lib/actions/handleSignOut";

const DesktopHeader = ({
  session,
  isAdmin,
}: {
  session: Session;
  isAdmin: boolean;
}) => {
  return (
    <div className="hidden md:flex flex-col relative h-[120px] items-start justify-center mt-3">
      <div className="mt-12 flex w-full items-center">
        <div className="flex flex-[1] justify-start">
          <Link href="/" className="flex flex-row">
            <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
            <h1 className="flex flex-col font-[500] text-3xl ml-3 text-white leading-none">
              <span className="font-ibm-plex-serif">BookHaven</span>
            </h1>
          </Link>
        </div>

        <div className="flex flex-[3] justify-center">
          <SearchBar />
        </div>

        <div className="flex flex-[1] justify-end">
          <ul className="flex items-center gap-8">
            <li>
              <form action={handleSignOut}>
                <div className="flex items-center gap-[80px]">
                  <Button>Log out</Button>
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
      <div className="z-25 w-full flex flex-row justify-between px-10 mt-5">
        {navLinks.map((link, i) => (
          <Link key={i} href={link.href} className="cursor-pointer">
            <p className="z-25 text-lg text-white my-2">{link.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopHeader;
