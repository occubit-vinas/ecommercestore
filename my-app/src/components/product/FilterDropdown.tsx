"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useProductStore } from "@/stores/product/product"
import Image from "next/image"

// type Option = {
//   label: string
//   value: string
// }

// type Props = {
//   label: string
//   filterKey: "sort" | "category" | "price" | "rating" | "status"
//   options: Option[]
// }

export type options = {
  label:string,value:string
}

export function FilterDropdown({ label, filterKey, options }:{label:string,filterKey:string,options:options[]}) {
  const { filters, setFilter } = useProductStore();
  const [open, setOpen] = useState(false);
    
  return (
    <div className="min-w-[190px] min-h-[40px]">
      <Select
        value={filters[filterKey]}
        onValueChange={(value) => setFilter(filterKey, value)}
        onOpenChange={setOpen}
        className='h-full w-full'
      >
        <SelectTrigger className="flex items-center justify-between text-14-nml-506 rounded-[16px] [&>svg]:hidden py-0 h-full w-full">
          <SelectValue placeholder={` ${label}`} />

          {/* <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          /> */}
          <Image src='arrow-down.svg' height={20} width={20} alt='aerrow' className={`size-[20px] ${open ? "totate-180":""}`}/>
        </SelectTrigger>

        <SelectContent className='h-full w-full'>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
