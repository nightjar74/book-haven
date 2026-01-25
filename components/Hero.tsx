"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ImgButton from "./ui/heroButton";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import Indicator from "./ui/indicator";
import CuratedCard from "./curatedCard";
import { useRouter } from "next/navigation";
import { Collection, HeroProps } from "@/types";

const images = [
  {
    url: "/images/newBooks-first.png",
    alt: "Mountain landscape",
  },
  {
    url: "/images/newBooks-second.png",
    alt: "Ocean sunset",
  },
  {
    url: "/images/newBooks-first.png",
    alt: "Forest path",
  },
  {
    url: "/images/newBooks-second.png",
    alt: "Desert vista",
  },
];

export default function Hero({ data }: HeroProps) {
  const { currentIndex, goToNext, goToPrevious, goToSlide } = useHeroCarousel({
    itemCount: images.length,
    autoPlayInterval: 10000,
  });
  const router = useRouter();
  //console.log("data from hero", data);

  return (
    <div className="relative w-full md:h-[550px] h-[300px] flex md:flex-row flex-col overflow-hidden">
      <div className="relative h-full flex flex-row md:min-w-[1070px] md:w-[1070px] w-full">
        <div className="relative w-full h-full mx-2 md:mx-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                width={1070}
                height={140}
                loading="eager"
                className="w-full h-full object-stretch"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />
            </div>
          ))}
        </div>

        <ImgButton direction="left" onClick={goToPrevious} />
        <ImgButton direction="right" onClick={goToNext} />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {images.map((_, index) => (
            <Indicator
              key={index}
              index={index}
              isActive={index === currentIndex}
              onClick={() => goToSlide(index)}
              shape="circle"
            />
          ))}
        </div>
      </div>
      <div className="md:flex-col flex-row flex py-2 md:py-0">
        <CuratedCard data={data} />
      </div>
    </div>
  );
}
