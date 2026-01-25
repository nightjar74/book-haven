import { CuratedCardProps } from "@/types";
import Link from "next/link";
import { title } from "process";
import React from "react";

const text = [
  {
    id: 1,
    setNo: 1,
    title: "STAFF PICKS",
    subtitle: "staff picks for book lovers",
    imageSrc: "/images/cardImage-box.png",
  },
  {
    id: 2,
    setNo: 2,
    title: "BOOKS FOR THE HOLIDAY SEASON",
    subtitle: "cozy reading",
    imageSrc: "/images/cardImage-books.png",
  },
  {
    id: 3,
    setNo: 3,
    title: "BODY, MIND AND SOUL",
    subtitle: "sports, yoga and health",
    imageSrc: "/images/cardImage-read.png",
  },
];

const CuratedCard = ({ data }: CuratedCardProps) => {
  const cards = !data ? text : data;
  return (
    <div className="h-full w-full px-4 flex md:flex-col flex-row gap-2">
      {cards.map((item: any, index: number) => (
        <React.Fragment key={item.setNo}>
          <Link
            href={`/sets/${item.title}`}
            className="h-[200px] group hidden relative md:grid grid-rows-1 w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md hover:bg-[#9d3128] active:scale-[0.98]"
          >
            <div className="flex flex-col pr-4 w-full h-7 justify-center mt-2">
              <h3 className="text-xl font-normal tracking-tight text-gray-900 uppercase">
                {item.title}
              </h3>
            </div>
            <div className="flex w-full flex-row justify-between gap-2">
              <p className="text-md text-gray-500 leading-tight mt-2">
                {item.subtitle}
              </p>
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-red-50">
                {!item.imageSrc ? (
                  <div className="h-full w-full bg-orange-400 transition-transform duration-300 group-hover:scale-110"></div>
                ) : (
                  <img
                    src={`${item.imageSrc.trim()}.png`}
                    alt={"info image"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    width="96"
                    height="96"
                  />
                )}
              </div>
            </div>
          </Link>

          {/* mobile version */}
          <Link
            href={`/sets/${item.title}`}
            className="flex items-center justify-center md:hidden z-50 flex-col w-full h-[140px] overflow-hidden rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md hover:bg-[#9d3128] active:scale-[0.98] group"
          >
            <div className="relative w-full h-[80px] flex items-center justify-center overflow-hidden ">
              {!item.imageSrc ? (
                <div className="h-[55px] w-[55px] rounded-full bg-orange-400 transition-transform duration-300 group-hover:scale-110"></div>
              ) : (
                <img
                  src={`${item.imageSrc.trim()}.png`}
                  alt={"info image"}
                  className="h-[55px] w-[55px] object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              )}
            </div>
            <h3 className="text-[60%] font-normal tracking-tight text-center h-8 pt-2 text-gray-900 uppercase mb-3">
              {item.title}
            </h3>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CuratedCard;
