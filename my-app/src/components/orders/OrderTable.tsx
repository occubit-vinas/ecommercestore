import React,{useState,useMemo} from 'react'
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { useProductStore } from '@/stores/product/product';
import { useCategoryStore } from '@/stores/category/category';
import { findCategoryById } from '@/utils/flattenTree';
import { flattenCategories } from '@/utils/flattenTree';
import {order_data} from './data';
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

const ProductTable = () => {

  const router = useRouter();
//   const {allProducts } = useProductStore();
//   const {categories} = useCategoryStore();
  // console.log('pp is',allProducts.products);
//   console.log('category data is',categories[0]);
  

  const [cheak, setcheak] = useState<string[]>([]);
    console.log(order_data);
    

    const handleChekedRow = (id: string) => {
      console.log(id);
      
        setcheak((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    const handleCheakAll = () => {
        if (cheak.length == order_data.length) {
            setcheak([]);
        } else {
            setcheak(order_data.map((r) => r.id));
        }

    }

    const handleEditClick = () =>{
      router.push('/edit_product')
    }

  return (
    <Table className="w-[1744px] border-collapse border-separate border-spacing-y-[10px] h-auto">
      <TableHeader className="rounded-[22px] shadow-[0px_0px_4px_0px_#00000040] h-[42px]">
        <TableRow className="rounded-[22px] ">
          <TableHead className='flex flex-row gap-[8px] items-center'><Checkbox checked={order_data.length === cheak.length} onCheckedChange={()=> handleCheakAll()}/><p>Order</p></TableHead>
          <TableHead className='text-14-md'>Customer</TableHead>
          <TableHead className='text-14-md'>Total</TableHead>
          <TableHead className='text-14-md'>Payment</TableHead>
          <TableHead className='text-14-md'>Status</TableHead>
          <TableHead className='text-14-md'>Date</TableHead>
          <TableHead className='text-14-md'>Action</TableHead>
        </TableRow>
      </TableHeader>

        {order_data && <TableBody className='text-14-md-52'>
          {order_data.map((item,index)=>(
          <TableRow className="shadow-[0px_0px_2px_0.2px_#00000040] h-[42px] rounded-[22px] mb-[10px] " key={index}>
            <TableCell className='flex flex-row gap-[8px] mt-[3px]'>
              <Checkbox
                  checked={cheak.includes(item.id)}
                  onCheckedChange={() => handleChekedRow(item.id)}
                />
                <p className='flex items-center mt-[3px]'>{item.id}</p>
            </TableCell>
            <TableCell>
              <p>{item.customer}</p>
            </TableCell>
            <TableCell>
              {item.total}
            </TableCell>
            <TableCell className='flex flex-row gap-[8px] items-center justify-center'>
              {item.payment  === 'Paid' ?<Image src='/tick-circle.svg' height={18} width={18} className='size-[18px]' alt='img'/>:<Image src='/close-circle.svg' height={18} width={18} className='size-[18px]' alt='img'/>}
              <p className='pt-[2px]'>{item.payment}</p>
            </TableCell>

            <TableCell className=''>
              <div className='flex flex-row items-center justify-center gap-[8px]'>

              {item.status === 'Delivered' && <Image src='/tick-circle.svg' height={18} width={18} className='size-[18px]' alt='img'/>}
              {item.status === 'Shipped' && <Image src='/truck.svg' height={18} width={18} className='size-[18px]' alt='img'/>}
              {item.status === 'Confirmed' && <Image src='/clock.svg' height={18} width={18} className='size-[18px]' alt='img'/>}
              <p className=''>{item.status}</p>
              </div>
            </TableCell>

            <TableCell>
              {item.date}
            </TableCell>

            <TableCell className='flex flex-row gap-[10px] justify-center'>
                <Image src='/eye.svg' height={20} width={20} alt='eye'/>
                <Image src='/download.svg' height={20} width={20} alt='eye' onClick={()=>handleEditClick()}/>
                <Image src='/trash.svg' height={20} width={20} alt='eye' onClick={()=>(alert('want to delete it?'))}/>
            </TableCell>

          </TableRow>
          ))}
        </TableBody>
        }

    </Table>
  )
}

export default ProductTable