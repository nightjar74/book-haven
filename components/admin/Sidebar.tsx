"use client";

import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import Popover from "./ui/userPopover";
import { use } from "react";
import { useLocale } from "@/app/providers/I18nProvider";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <div className="admin-sidebar">
      <div>
        <Link href={"/"}>
          <div className="logo">
            <Image
              src="/icons/admin/logo.svg"
              alt="logo"
              height={37}
              width={37}
            />
            <h1>BookHaven</h1>
          </div>
        </Link>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm",
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""}  object-contain`}
                    />
                  </div>

                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {t(link.textKey)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Popover session={session} />
    </div>
  );
};

export default Sidebar;
