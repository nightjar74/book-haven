"use server";
import { getBorrowRecords } from "@/lib/actions/data-fetchers";
import { addMockData, generateYAxis, getDate } from "@/lib/utils";
import React from "react";
import YearSelect from "./yearSelect";

type Props = {
  searchParams?: Promise<{
    year?: string;
  }>;
  yAxisLabels?: string[];
  length?: number;
  title?: string;
  borrowedData?: { date: string; count: number }[];
};

const BarChart = async ({ title = "Books Borrowed", searchParams }: Props) => {
  const chartHeight = 350;
  const params = await searchParams;
  const currentYear = params?.year || "2026";
  let borrowedData = await getBorrowRecords(currentYear);
  const { yAxisLabels, topLabel } = generateYAxis(borrowedData);
  borrowedData = addMockData(borrowedData);
  //console.log(borrowedData, "borrowed data linechart");

  return (
    <div className="md:w-[50%] w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {title}
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="md:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {borrowedData.map((book, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * book.count}px`,
                }}
              ></div>
              <p className="-rotate-90 md:text-sm text-xs text-gray-400 sm:rotate-0">
                {book.date}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <YearSelect currentYear={currentYear} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
