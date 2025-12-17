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
                    label="All Status"
                    filterKey="status"
                    options={[
                        { label: "Active", value: "ACTIVE" },
                        { label: "Inactive", value: "INACTIVE" },
                        { label: "Draft", value: "DRAFT" },
                    ]}
                />
                
                <FilterDropdown
                    label="All Type"
                    filterKey="price"
                    options={[
                        { label: "Cashback", value: "low" },
                        { label: "Discount", value: "high" },
                        { label: "Free delivery", value: "very_high" },
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