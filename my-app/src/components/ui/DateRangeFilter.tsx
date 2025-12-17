'use client';

import * as React from "react";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import Image from "next/image";
import { Button } from "./Button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DateRangeFilterProps } from "@/types/ui.types";


export function DateRangeFilter({
  value,
  onChange,
  placeholder = "Select date",
  className,
}: DateRangeFilterProps) {

    const [open,setopen]=useState<boolean>(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`max-h-[40px] min-w-[190px] justify-between ${className} text-14-nml-506 rounded-[16px]`}
          onClick={()=>setopen(!open)}
        >
          {value.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL dd, y")} -{" "}
                {format(value.to, "LLL dd, y")}
              </>
            ) : (
              format(value.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
          
            <Image src='arrow-down.svg' height={20} width={20} alt='aerrow' className={`size-[20px] ${open ? "totate-180":""}`}/>

        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={
            value.from
              ? { from: value.from, to: value.to ?? undefined }
              : undefined
          }
          onSelect={(range: DateRange | undefined) => {
            onChange({
              from: range?.from ?? null,
              to: range?.to ?? null,
            });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
