"use client";

import React from "react";
import Image from "next/image";
import { SearchBarProps } from "@/types/ui.types";
import { Input } from "./input";
const Serch_bar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search here...",
  className = "",
}) => {
  return (
    <div
      className={`h-[40px] w-[280px] rounded-[16px] border-[0.5px] border-[#4D4F5240] px-[10px] flex items-center gap-[8px] backdrop-blur-[10px] ${className}`}
    >
      <Image
        src="/search_glass.svg"
        height={20}
        width={20}
        alt="search"
        className="size-[20px]"
      />

      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="outline-none bg-transparent w-full text-14-nml placeholder:text-[#8A8A8A] border-none"
      />
    </div>
  );
};

export default Serch_bar;
