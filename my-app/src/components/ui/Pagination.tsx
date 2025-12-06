"use client";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { PaginationProps } from "@/types/ui.types";
import Image from "next/image";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
  maxVisiblePages = 3,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // compute visible page block (groups of maxVisiblePages)
  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const pageNumbers: number[] = [];
  for (let i = startPage; i < startPage + maxVisiblePages && i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row items-center justify-between  w-[1784px] h-[34px] ">
      <p className="text-12-nml">
        {startItem} to {endItem} items of {totalItems}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1 || totalItems === 0}
          className=" text-gray-500 disabled:opacity-40 text-2xl"
          aria-label="Previous page"
        >
          {/* <AiOutlineLeft /> */}
          <Image src='/arrow-left.svg' height={20} width={20} className='size-[20px]' alt='left aerrow'/>
        </button>

        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={currentPage === p ? "page" : undefined}
            className={` rounded-full  size-[30px] text-12-nml flex items-center justify-center ${
              currentPage === p
                ? "bg-[#4D4F521A]"
                : ""
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalItems === 0}
          className=" py-1 text-gray-500 disabled:opacity-40 text-2xl"
          aria-label="Next page"
        >
         {/* <AiOutlineRight /> */}
        <Image src='/arrow-right.svg' height={20} width={20} className='size-[20px]' alt='left aerrow'/>

        </button>
      </div>
    </div>
  );
};

export default Pagination;