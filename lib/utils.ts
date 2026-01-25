import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripHtml = (html: string) => {
  return html
    .replace(/<br\s*\/?>/gi, " ") //  Replace <br> with spaces so words don't stick together
    .replace(/<[^>]*>?/gm, "") //  Strip all other HTML tags
    .replace(/&nbsp;/g, " ") //  Handle common entities
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ") // Collapse multiple spaces/newlines into one
    .trim();
};

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const generateYAxis = (aggregatedData: any[]) => {
  if (!aggregatedData || aggregatedData.length === 0) {
    return { yAxisLabels: ["10", "8", "6", "4", "2", "0"], topLabel: 0.01 };
  }

  const highestCount = Math.max(...aggregatedData.map((item) => item.count));

  const topLabel = Math.ceil(highestCount / 10) * 10;

  const yAxisLabels = [];
  for (let i = topLabel; i >= 0; i -= 2) {
    yAxisLabels.push(`${i}`);
  }
  //console.log(aggregatedData, "yaxislabels");

  return { yAxisLabels, topLabel };
};

export const getDate = (isoDateString: string | Date) => {
  const monthNames = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "June",
    7: "July",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const date = new Date(isoDateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthName = monthNames[month as keyof typeof monthNames];

  const formattedDate = `${monthName}`;

  return formattedDate;
};

export const addMockData = (borrowedData: any[]) => {
  const mockData = [
    { date: "Jan", count: 0 },
    { date: "Feb", count: 0 },
    { date: "Mar", count: 0 },
    { date: "Apr", count: 0 },
    { date: "May", count: 0 },
    { date: "Jun", count: 0 },
    { date: "Jul", count: 0 },
    { date: "Aug", count: 0 },
    { date: "Sep", count: 0 },
    { date: "Oct", count: 0 },
    { date: "Nov", count: 0 },
    { date: "Dec", count: 0 },
  ];

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const existingDates = new Set(borrowedData.map((item) => item.date));

  mockData.forEach((mockItem) => {
    if (!existingDates.has(mockItem.date)) {
      borrowedData.push(mockItem);
    }
  });

  borrowedData.sort((a, b) => {
    return monthOrder.indexOf(a.date) - monthOrder.indexOf(b.date);
  });

  return borrowedData;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
