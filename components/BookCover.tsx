"use client";

import React from "react";
import { cn } from "@/lib/utils";
import BookCoverSvg from "@/components/BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";

type BookCoverVariant =
  | "extraSmall"
  | "small"
  | "medium"
  | "regular"
  | "wide"
  | "mobile";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  mobile: "book-conver_mobile",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  title?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  title,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  //console.log("coverImage:", coverImage);
  const isImageKitUrl = !coverImage?.includes("ik.imagekit.io");

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
        {/*         <div className="w-full h-full flex items-center">
          <p className="text-center">{title}</p>
        </div> */}
      </div>
    </div>
  );
};
export default BookCover;
