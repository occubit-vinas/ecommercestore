import React, { useState, useMemo } from 'react'
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { useProductStore } from '@/stores/product/product';
import { useCategoryStore } from '@/stores/category/category';
import { findCategoryById } from '@/utils/flattenTree';
import { flattenCategories } from '@/utils/flattenTree';
import { review_data } from './data';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import formatDate from '../../utils/date';
import { useRouter } from 'next/navigation';
import EmptyMsg from '../ui/EmptyMsg';

const ReviewTable = () => {

    const router = useRouter();
    //   const {allProducts } = useProductStore();
    //   const {categories} = useCategoryStore();
    // console.log('pp is',allProducts.products);
    //   console.log('category data is',categories[0]);


    const [cheak, setcheak] = useState<string[]>([]);
    console.log(review_data);


    const handleChekedRow = (id: string) => {
        console.log(id);

        setcheak((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    const handleCheakAll = () => {
        if (cheak.length == review_data.length) {
            setcheak([]);
        } else {
            setcheak(review_data.map((r) => r.id));
        }

    }

    const handleEditClick = () => {
        router.push('/edit_product')
    }

    return (
        <Table className="w-[1744px] border-collapse border-separate border-spacing-y-[10px] h-auto">
            <TableHeader className="rounded-[22px] shadow-[0px_0px_4px_0px_#00000040] h-[42px]">
                <TableRow className="rounded-[22px] ">
                    <TableHead className='flex flex-row gap-[8px] items-center'><Checkbox checked={review_data.length === cheak.length} onCheckedChange={() => handleCheakAll()} /><p className='mt-[3px]'>Review</p></TableHead>
                    <TableHead className='text-14-md'>Product</TableHead>
                    <TableHead className='text-14-md'>Customer</TableHead>
                    <TableHead className='text-14-md'>Rating</TableHead>
                    <TableHead className='text-14-md'>Date</TableHead>
                    <TableHead className='text-14-md'>Status</TableHead>
                </TableRow>
            </TableHeader>

            {review_data.length > 0 && <TableBody className='text-14-md-52'>
                {review_data.map((item, index) => (
                    <TableRow className="shadow-[0px_0px_2px_0.2px_#00000040] h-[42px] rounded-[22px] mb-[10px] " key={index}>
                        <TableCell className='flex flex-row gap-[8px] mt-[3px]'>
                            <Checkbox
                                checked={cheak.includes(item.id)}
                                onCheckedChange={() => handleChekedRow(item.id)}
                            />


                            <p className='flex items-center mt-[3px]'>{item.review}</p>

                        </TableCell>
                        <TableCell className=''>
                            <div className=' flex justify-center'>
                                <p className='text-16-md-f52 '>{item.product}</p>
                            </div>
                        </TableCell>

                        <TableCell className='flex flex-row gap-[8px] items-center justify-center'>
                            <p className=''>{item.customer}</p>
                        </TableCell>

                        <TableCell className=''>
                            <div className='flex flex-row items-center justify-center gap-[8px]'>
                                <p>{item.rating}</p>
                            </div>
                        </TableCell>

                        <TableCell className='flex flex-row items-center justify-center gap-[2px]'>
                            <p className=''>{item.date}</p>
                        </TableCell>

                        <TableCell className=''>
                            <div className='flex flex-row gap-[4px] items-center justify-center'>

                                {item.status}
                            </div>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
            }
            {
                review_data.length === 0  && <div className='h-full  flex  items-center justify-center pt-[120px] translate-x-[600px]'>
                    <EmptyMsg msg='no Review found'/>
                </div>
            }
        </Table>
    )
}

export default ReviewTable;