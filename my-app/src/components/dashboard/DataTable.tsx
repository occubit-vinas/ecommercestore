"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

export type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (row: T) => ReactNode;
    className?: string;
};

export type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];                      
    emptyMessage?: string;
    className: string;
    title: string;
    desc: string;
};

function hasSizeFields(row: any): row is { size?: string; color?: string } {
    return row && ("size" in row || "color" in row);
}

export function DataTable<T>({
    columns,
    data,
    emptyMessage = "No data found",
    className = '',
    title,
    desc
}: DataTableProps<T>) {
    return (
        <div className={`${className} px-[20px] py-[14px] rounded-[12px] shadow-[1px_1px_4px_0.5px_rgba(0,0,0,0.25)] flex flex-col gap-[0px] `}>

            <div className='flex flex-col gap-[5px]'>
                <p className='text-18-md'>{title}</p>
                <p className='text-12-nml'>{desc}</p>
            </div>

            <Table className=' px-[2px] border-separate border-spacing-y-[10px] border-none overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                <TableHeader>
                    <TableRow className='rounded-[22px] h-[42px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'>
                        {columns.map((col) => (
                            <TableHead key={col.key as string} className='border-0'>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rowIndex) => (
                            <TableRow key={rowIndex} className='border-0 rounded-[22px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] text-14-nml my-[10px] h-[42px] '>

                                {columns.map((col) => (
                                    <TableCell
                                        key={col.key as string}
                                        className={`${col.className} border-0`}
                                    >
                                        {col.key === 'name' ? (
                                            <div className='flex flex-row gap-[3px]'>
                                                <div className='bg-gray-200 rounded-full size-[30px]' />
                                                <div className='mt-[4px]'>

                                                    {/* Render custom or default */}
                                                    {col.render
                                                        ? col.render(row)
                                                        : (row[col.key as keyof T] as ReactNode)
                                                    }

                                                    {/* Extra UI for size/color — SAFE now */}
                                                    {hasSizeFields(row) && (
                                                        <p>
                                                            size: {row.size ?? "-"} | color: {row.color ?? "-"}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {col.render
                                                    ? col.render(row)
                                                    : (row[col.key as keyof T] as ReactNode)
                                                }
                                            </div>
                                        )}
                                    </TableCell>
                                ))}

                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
