"use client";
import { useUserActivity } from "@/app/context/userActivityProvider";
import React, { useState } from "react";

type Props = {
  yAxisLabels: string[];
  length: number;
  title?: string;
  borrowedData: string[] | any[];
};

const LineChart = ({
  yAxisLabels,
  length,
  title = "Books Borrowed",
  borrowedData,
}: Props) => {
  const { selectedUser } = useUserActivity();
  const [userName, setUserName] = useState(title);
  if (!selectedUser.isSelected) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        nothing to display
      </div>
    );
  }
  const chartHeight = 350;
  const chartWidth = borrowedData.length * 80; // Width per data point

  const filteredData = borrowedData.filter(
    (item: any) => item.id !== selectedUser.userid,
  );

  //console.log(selectedUser, filteredData, "this is the filtered data");

  const points = filteredData.map((book, index) => {
    const x = (index * chartWidth) / (borrowedData.length - 1 || 1);
    const y = chartHeight - (chartHeight / length) * book.count;
    return { x, y, count: book.count, date: book.date };
  });

  const pathD = points
    .map((point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      return `L ${point.x} ${point.y}`;
    })
    .join(" ");

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {selectedUser.name}
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 flex items-end gap-4 rounded-md bg-white p-4">
          <div
            className="flex flex-col justify-between text-sm"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label} className="text-gray-600">
                {label}
              </p>
            ))}
          </div>

          <div className="flex-1 relative">
            <svg
              width="100%"
              height={chartHeight}
              className="overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {yAxisLabels.map((_, index) => {
                const y = (index * chartHeight) / (yAxisLabels.length - 1);
                return (
                  <line
                    key={index}
                    x1="0"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              <path
                d={pathD}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              <defs>
                <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d={`${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`}
                fill="url(#lineGradient)"
              />

              {points.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="transparent"
                    className="cursor-pointer hover:fill-blue-100 transition-all"
                    vectorEffect="non-scaling-stroke"
                  >
                    <title>{`${point.date}: ${point.count} books`}</title>
                  </circle>
                </g>
              ))}
            </svg>

            <div className="flex justify-between mt-4">
              {borrowedData.map((book, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-400 text-center"
                  style={{ width: `${100 / borrowedData.length}%` }}
                >
                  {book.date}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
