"use client";

import React, { useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/category/category";
import Serch_bar from "../ui/Serch_bar";
import Link from "next/link";
// import { formatDate } from "@/utils/date";
import formatDate from "@/utils/date";
import Image from "next/image";
import CustomCheckbox from "../ui/CustomCheakbox";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Pagination from "./Pagination";

const Cat_table = () => {

    const {
        categories,
        loading,
        fetchcategories,
        fetchCategorieById,
        handleDelCategory,
    } = useCategoryStore();

    useEffect(() => {
        fetchcategories();
    }, [fetchcategories]);

    // const data_f = categories.flat();
    // console.log('flat is',data_f);
    
    const data = categories;
    console.log('data is...', data);


    const [cheak, setcheak] = useState<string[]>([]);

    const handleChekedRow = (id: string) => {
        setcheak((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    const handleCheakAll = () => {
        if (cheak.length == data.length) {
            setcheak([]);
        } else {
            setcheak(data.map((r) => r.id ?? ""));
        }
    }

    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    const toggleExpand = (id: string) => {
        setExpandedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const [page, setPage] = useState<number>(1);
    const totalItems = data.length;
    const perPage = 2;

    const currentData = data.slice((page - 1) * perPage, page * perPage);

    const renderRows = (items: any[], level = 0) => {
        return items.map((item) => (
            <React.Fragment key={item.id}>
                <TableRow
                    className="shadow-[0px_0px_2px_0.2px_#00000040] h-[42px] rounded-[22px] mb-[10px] "
                >
                    <TableCell
                        className="max-w-[744px]  py-3 flex items-center gap-[8px] ml-[10px]"
                        style={{ paddingLeft: `${level * 20}px` }}
                    >
                        {/* Checkbox */}
                        <div className='mt-[2px]'>

                            <CustomCheckbox
                                checked={cheak.includes(item.id)}
                                onChange={() => handleChekedRow(item.id)}
                            />
                        </div>

                        {/* Arrow – only if children */}
                        {item.children?.length > 0 && (
                            <Image
                                src="/arrow-right.svg"
                                height={20}
                                width={20}
                                alt="arrow"
                                onClick={() => toggleExpand(item.id)}
                                className={`size-[20px] transition-transform cursor-pointer ${expandedRows.includes(item.id) ? "rotate-90" : ""
                                    }`}
                            />
                        )}

                        {/* Tag icon */}
                        <Image
                            src="/tag.svg"
                            height={20}
                            width={20}
                            alt="label"
                            className="size-[20px]"
                        />

                        {item.name}
                    </TableCell>

                    {/* Products */}
                    <TableCell className="w-[200px] px-4 py-3">3</TableCell>

                    {/* Status */}
                    <TableCell className="w-[200px] pl-16 py-3 flex flex-row gap-[8px]">
                        <Image
                            src="/tick-circle.svg"
                            width={18}
                            height={18}
                            className="size-[18px]"
                            alt="tick"
                        />
                        <span className='mt-[3px]'>Active</span>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="w-[300px] px-4 py-3">
                        {item.createdAt ? formatDate(item.createdAt) : "—"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="w-[280px] ">
                        <div className="flex gap-3 pl-20">
                            <button
                                onClick={() => item.id && fetchCategorieById(item.id)}
                                disabled={loading}
                            >
                                <Image src='/eye.svg' className='size-[20px] cursor-pointer' alt='eye' height={20} width={20} />
                            </button>

                            <Link href={`edit_category/${item.id}`}>
                                <Image src='/edit.svg' className='size-[20px] cursor-pointer' alt='edit' height={20} width={20} />
                            </Link>

                            <Image src='/box-add.svg' className='size-[20px] cursor-pointer' alt='add' height={20} width={20} />

                            <button onClick={() => item.id && handleDelCategory(item.id)}>
                                <Image src='/trash.svg' className='size-[20px] cursor-pointer' alt='trash' height={20} width={20} />
                            </button>
                        </div>
                    </TableCell>
                </TableRow>

                {/* CHILDREN RENDERING */}
                {expandedRows.includes(item.id) &&
                    item.children?.length > 0 &&
                    renderRows(item.children, level + 1)}
            </React.Fragment>
        ));
    };

    return (
        <>
            <div className="bg-white rounded-xl p-[20px] flex flex-col gap-[20px] w-[1784px] min-h-[710px] shadow-[0px_2px_2px_0px_#05050640,2px_0px_2px_0px_#05050640,inset_0px_2px_2px_0px_#05050640,inset_2px_0px_2px_0px_#05050640]">

                <Serch_bar value='' onChange={()=>{}}/>

                <Table className="max-w-[1744px] border-collapse border-separate border-spacing-y-[10px] ">

                    {/* HEADER */}
                    <TableHeader className="rounded-[22px] shadow-[0px_0px_4px_0px_#00000040] h-[42px]">
                        <TableRow className="rounded-[22px]  ">
                            <TableHead className="text-14-md w-[764px] flex justify-start pl-[10px] pt-[12px] gap-[8px] "><CustomCheckbox checked={cheak.length === data.length} onChange={() => handleCheakAll()} /><p className='pt-[4px]'>Category</p></TableHead>
                            <TableHead className="text-14-md w-[200px] ">Products</TableHead>
                            <TableHead className="text-14-md w-[200px] ">Status</TableHead>
                            <TableHead className="text-14-md w-[300px] ">Date Created</TableHead>
                            <TableHead className="text-14-md w-[280px] ">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* BODY */}
                    {currentData && <TableBody className="text-14-md-52">
                        {renderRows(currentData)}
                    </TableBody>
                    }
                </Table>
            </div>
            {/* <h1>hello there</h1> */}
            <Pagination
                totalItems={totalItems}
                itemsPerPage={perPage}
                currentPage={page}
                onPageChange={setPage}
            />

        </>
    );
};

export default Cat_table;
