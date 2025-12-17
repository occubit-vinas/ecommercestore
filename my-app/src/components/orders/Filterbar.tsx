'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useProductStore } from '@/stores/product/product'
import { FilterDropdown } from '../product/FilterDropdown'
import { DateRangeFilter } from '../ui/DateRangeFilter'
import { format } from "date-fns";

const Filterbar = () => {

    const { filters, resetFilters, setFilter } = useProductStore();

    return (
        <div className='w-full h-[40px] flex flex-row justify-between items-center'>
            <div className='flex flex-row gap-[10px]'>
                <FilterDropdown
                    label="All categories"
                    filterKey="status"
                    options={[
                        { label: "Pending", value: "Pending" },
                        { label: "Processing", value: "Processing" },
                        { label: "Shipped", value: "Shipped" },
                        { label: "Delivered", value: "Delivered" },
                        { label: "Cancelled", value: "Cancelled" },
                        { label: "Failed", value: "Failed" },
                        { label: "Refunded", value: "Refunded" },
                        { label: "Confirmed", value: "Confirmed" },
                        { label: "Returned", value: "Returned" },
                    ]}
                />

                <FilterDropdown
                    label="All Payment Status"
                    filterKey="payment_status"
                    options={[
                        { label: "All Payment Status", value: "payment_sts"},
                        { label: "Paid", value: "paid" },
                        { label: "Pending", value: "pending" },
                        { label: "Failed", value: "failed" },
                        { label: "Refunded", value: "refund" },
                        { label: "Partially Refunded", value: "partiaally_refunded" },
                    ]}
                />
                
                <DateRangeFilter
                    value={filters.date}
                    placeholder="Date"
                    onChange={(range) => setFilter("date", {
                        from: range.from ? format(range.from, "yyyy-MM-dd") : null,
                        to: range.to ? format(range.to, "yyyy-MM-dd") : null,
                    })}
                />
                
            </div>
            <div className='flex flex-row gap-[8px] items-center cursor-pointer' onClick={() => resetFilters()}>
                <Image src='close-circle.svg' height={18} width={18} alt='close' className='size-[18px]' />
                <span>Clear All</span>

            </div>
        </div>
    )
}

export default Filterbar