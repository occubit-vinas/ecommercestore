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
                    label="Status"
                    filterKey="status"
                    options={[
                        { label: "Active", value: "ACTIVE" },
                        { label: "Popular", value: "INACTIVE" },
                    ]}
                />
                <FilterDropdown
                    label="All Ratings"
                    filterKey="price"
                    options={[
                        { label: "above 4", value: "low" },
                        { label: "5 out of 5", value: "high" },
                        { label: "below 2", value: "very_high" },
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