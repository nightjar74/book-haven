"use client";
import React, { useEffect, useState } from "react";
import { navLinks } from "@/constants";
import { useLocale } from "@/app/providers/I18nProvider";
import Link from "next/link";

const TnavLinks = () => {
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="z-25 w-full flex flex-row justify-between px-10 mt-5 h-[44px]"></div>
    );
  }
  return (
    <div className="z-25 w-full flex flex-row justify-between px-10 mt-5">
      {navLinks.map((link, i) => (
        <Link key={i} href={link.href} className="cursor-pointer">
          <p className="z-25 text-lg text-white my-2">{t(link.titleKey)}</p>
        </Link>
      ))}
    </div>
  );
};

export default TnavLinks;
