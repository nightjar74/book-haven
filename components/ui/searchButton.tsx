import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";

type Props = {
  classname?: string;
  size?: number;
  onClick?: () => void;
};

const SearchButton = ({ classname, size, onClick }: Props) => {
  return (
    <div className="bg-white w-12 px-[2px] py-[2px]">
      <button
        className={cn(
          "bg-[#77211a] h-full w-full flex items-center justify-center rounded-sm",
          classname
        )}
        onClick={onClick}
      >
        <Search size={size || 22} color="white" />
      </button>
    </div>
  );
};

export default SearchButton;
