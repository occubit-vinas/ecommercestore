import React,{useState,useMemo} from 'react'
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { useProductStore } from '@/stores/product/product';
import { useCategoryStore } from '@/stores/category/category';
import { findCategoryById } from '@/utils/flattenTree';
import { flattenCategories } from '@/utils/flattenTree';
import {coupon_data} from './data';
import ProgressBar from './ProgressBar';
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

const CouponTable = () => {

  const router = useRouter();
//   const {allProducts } = useProductStore();
//   const {categories} = useCategoryStore();
  // console.log('pp is',allProducts.products);
//   console.log('category data is',categories[0]);
  

  const [cheak, setcheak] = useState<string[]>([]);
    console.log(coupon_data);
    

    const handleChekedRow = (id: string) => {
      console.log(id);
      
        setcheak((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    const handleCheakAll = () => {
        if (cheak.length == coupon_data.length) {
            setcheak([]);
        } else {
            setcheak(coupon_data.map((r) => r.id));
        }

    }

    const handleEditClick = () =>{
      router.push('/edit_product')
    }

  return (
    <Table className="w-[1744px] border-collapse border-separate border-spacing-y-[10px] h-auto">
      <TableHeader className="rounded-[22px] shadow-[0px_0px_4px_0px_#00000040] h-[42px]">
        <TableRow className="rounded-[22px] ">
          <TableHead className='flex flex-row gap-[8px] items-center'><Checkbox checked={coupon_data.length === cheak.length} onCheckedChange={()=> handleCheakAll()}/><p>Coupons</p></TableHead>
          <TableHead className='text-14-md'>Type & Value</TableHead>
          <TableHead className='text-14-md'>Usages</TableHead>
          <TableHead className='text-14-md'>Valid Period</TableHead>
          <TableHead className='text-14-md'>Status</TableHead>
          <TableHead className='text-14-md'>Date</TableHead>
          <TableHead className='text-14-md'>Action</TableHead>
        </TableRow>
      </TableHeader>

        {coupon_data && <TableBody className='text-14-md-52'>
          {coupon_data.map((item,index)=>(
          <TableRow className="shadow-[0px_0px_2px_0.2px_#00000040] h-[42px] rounded-[22px] mb-[10px] " key={index}>
            <TableCell className='flex flex-row gap-[8px] mt-[3px]'>
              <Checkbox
                  checked={cheak.includes(item.id)}
                  onCheckedChange={() => handleChekedRow(item.id)}
                />
                <div className='flex flex-col gap-[1px]'>

                <p className='flex items-center '>{item.id}</p>
                <p className='flex items-center '>{item.name}</p>
                <p className='flex items-center '>{item.min_value}</p>
                </div>
            </TableCell>
            <TableCell className=''>
                <div className=' flex justify-center'>

              <p className='text-16-md-f52 border-[1px] border-[#6C6C80] rounded-[20px] h-[40px] w-[160px] text-center flex items-center justify-center'>${item.value}OFF</p>
                </div>
            </TableCell>

            

            <TableCell className='flex flex-row gap-[8px] items-center justify-center'>
              <ProgressBar total_c={item.total_c} use_c={item.use_c}/>
            </TableCell>

            <TableCell className=''>
              <div className='flex flex-col items-center justify-start gap-[8px]'>

                <p>From:{item.from}</p>
                <p>{item.to}</p>
              </div>
            </TableCell>

            <TableCell className='flex flex-row items-center justify-center gap-[2px]'>
                <p className='flex flex-row h-auto gap-[2px] translate-y-[13px]'>

              { item.status === 'Active' && <Image src='/tick-circle.svg' height={20} width={20} alt='eye'/>
              }
              <span className='mt-[3px]'>

              {item.status}
              </span>
                </p>
            </TableCell>

            <TableCell className=''>
               {item.date}
            </TableCell>

            <TableCell className='flex flex-row gap-[2px] items-center justify-center'>
               <div>
                </div> 
              <Image src='/eye.svg' height={20} width={20} alt='eye'/>
              <Image src='/download.svg' height={20} width={20} alt='eye'/>
              <Image src='/trash.svg' height={20} width={20} alt='eye'/>
            </TableCell>

          </TableRow>
          ))}
        </TableBody>
        }

    </Table>
  )
}

export default CouponTable;