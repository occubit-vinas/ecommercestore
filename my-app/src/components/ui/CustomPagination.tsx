'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./Pagination";

import Image from 'next/image'

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
};

export const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null;

  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (page) =>
        page === 1 ||
        page === totalPages ||
        Math.abs(currentPage - page) <= 1
    );

  return (
    <Pagination className=' w-auto '>
      <PaginationContent>
        <PaginationItem>

        <Image
          src='/arrow-left.svg' height={20} width={20} alt='left' className={`size-[20px] cursor-pointer ${currentPage <= 1 ? 'opacity-40 pointer-events-none':''}`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              className={`${page === currentPage ? 'rounded-full bg-[#4D4F521A] shadow-[0px_0px_2px_0.2px_#4D4F5240]':''} text-12-nml`}
            >
              {page}
            </PaginationLink>
            {/* {visiblePages[index + 1] &&
              visiblePages[index + 1] - page > 1 && (
                <PaginationEllipsis />
              )} */}
          </PaginationItem>
        ))}

        <PaginationItem>
          <Image
            src='/arrow-right.svg' height={20} width={20} alt='left' className={`size-[20px] cursor-pointer ${currentPage <= 1 ? 'opacity-40 pointer-events-none':''}`}

            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
