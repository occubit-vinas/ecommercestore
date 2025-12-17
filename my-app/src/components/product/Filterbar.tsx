'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useProductStore } from '@/stores/product/product'
import { FilterDropdown } from './FilterDropdown'
import { DateRangeFilter } from '../ui/DateRangeFilter'
import { format } from "date-fns";

const Filterbar = () => {

    const { filters, resetFilters, setFilter } = useProductStore();

    return (
        <div className='w-full h-[40px] flex flex-row justify-between items-center'>
            <div className='flex flex-row gap-[10px]'>
                <FilterDropdown
                    label="All categories"
                    filterKey="categorie"
                    options={[
                        { label: "cat1", value: "cat1" },
                        { label: "cat2", value: "cat2" },
                        { label: "cat3", value: "cat3" },
                    ]}
                />
                <FilterDropdown
                    label="All Stock Levels"
                    filterKey="stock_level"
                    options={[
                        { label: "In Stock", value: "in_stock" },
                        { label: "Low Stock", value: "low_stock" },
                        { label: "Out of stock", value: "out_of_stock" },
                    ]}
                />
                <FilterDropdown
                    label="All Status"
                    filterKey="status"
                    options={[
                        { label: "Active", value: "ACTIVE" },
                        { label: "Inactive", value: "INACTIVE" },
                        { label: "Draft", value: "DRAFT" },
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
                <FilterDropdown
                    label="Price"
                    filterKey="price"
                    options={[
                        { label: "low", value: "low" },
                        { label: "high", value: "high" },
                        { label: "very high", value: "very_high" },
                    ]}
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