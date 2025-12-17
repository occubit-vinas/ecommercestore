import React, { useState, useMemo } from 'react'
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { useProductStore } from '@/stores/product/product';
import { useCategoryStore } from '@/stores/category/category';
import { findCategoryById } from '@/utils/flattenTree';
import { flattenCategories } from '@/utils/flattenTree';
import { customer_data } from './data';
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
const CustomerTable = () => {

    const router = useRouter();
    //   const {allProducts } = useProductStore();
    //   const {categories} = useCategoryStore();
    // console.log('pp is',allProducts.products);
    //   console.log('category data is',categories[0]);


    const [cheak, setcheak] = useState<string[]>([]);
    console.log(customer_data);


    const handleChekedRow = (id: string) => {
        console.log(id);

        setcheak((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    const handleCheakAll = () => {
        if (cheak.length == customer_data.length) {
            setcheak([]);
        } else {
            setcheak(customer_data.map((r) => r.id));
        }

    }

    const handleEditClick = () => {
        router.push('/edit_product')
    }

    return (
        <Table className="w-[1744px] border-collapse border-separate border-spacing-y-[10px] h-auto">
            <TableHeader className="rounded-[22px] shadow-[0px_0px_4px_0px_#00000040] h-[42px]">
                <TableRow className="rounded-[22px] ">
                    <TableHead className='flex flex-row gap-[8px] items-center'><Checkbox checked={customer_data.length === cheak.length} onCheckedChange={() => handleCheakAll()} /><p className='mt-[3px]'>Customers</p></TableHead>
                    <TableHead className='text-14-md'>Email</TableHead>
                    <TableHead className='text-14-md'>Toatl Spent</TableHead>
                    <TableHead className='text-14-md'>Order</TableHead>
                    <TableHead className='text-14-md'>City</TableHead>
                    <TableHead className='text-14-md'>Status</TableHead>
                    <TableHead className='text-14-md'>Lat Order</TableHead>
                    <TableHead className='text-14-md'>Action</TableHead>
                </TableRow>
            </TableHeader>

            {customer_data && <TableBody className='text-14-md-52'>
                {customer_data.map((item, index) => (
                    <TableRow className="shadow-[0px_0px_2px_0.2px_#00000040] h-[42px] rounded-[22px] mb-[10px] " key={index}>
                        <TableCell className='flex flex-row gap-[8px] mt-[3px]'>
                            <Checkbox
                                checked={cheak.includes(item.id)}
                                onCheckedChange={() => handleChekedRow(item.id)}
                            />
                            

                                <p className='flex items-center mt-[3px]'>{item.name}</p>
                            
                        </TableCell>
                        <TableCell className=''>
                            <div className=' flex justify-center'>
                                <p className='text-16-md-f52 '>${item.email}</p>
                            </div>
                        </TableCell>

                        <TableCell className='flex flex-row gap-[8px] items-center justify-center'>
                            <p className=''>{item.spent}</p>
                        </TableCell>

                        <TableCell className=''>
                            <div className='flex flex-row items-center justify-center gap-[8px]'>
                                <Image src='/bag-tick.svg' height={20} width={20} alt='tick' className='size-[20px]' />
                                <p>{item.order}</p>
                            </div>
                        </TableCell>

                        <TableCell className='flex flex-row items-center justify-center gap-[2px]'>
                            <p className=''>{item.city}</p>
                        </TableCell>

                        <TableCell className=''>
                            <div className='flex flex-row gap-[4px] items-center justify-center'>

                            {item.status === 'Active' && <Image src='/tick-circle.svg' height={20} width={20} alt='img' className='size-[20px]' />}
                            {item.status === 'Cancel' && <Image src='/alert-circle.svg' height={20} width={20} alt='img' className='size-[20px]' />}
                            {item.status === 'Failed' && <Image src='/close-circle.svg' height={20} width={20} alt='img' className='size-[20px]' />}
                            {item.status}
                            </div>
                        </TableCell>

                        <TableCell>
                            {item.last_order}
                        </TableCell>

                        <TableCell className='flex flex-row gap-[10px] items-center justify-center'>
                            <div>
                            </div>
                            <Image src='/eye.svg' height={20} width={20} alt='eye' />
                            <Image src='/sms.svg' height={20} width={20} alt='eye' />
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
            }

        </Table>
    )
}

export default CustomerTable;