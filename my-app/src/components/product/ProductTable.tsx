import React, { useState, useMemo } from 'react'
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { useProductStore } from '@/stores/product/product';
import { useCategoryStore } from '@/stores/category/category';
import { findCategoryById } from '@/utils/flattenTree';
import { flattenCategories } from '@/utils/flattenTree';
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
  const { allProducts,filters,search } = useProductStore();
  const { categories } = useCategoryStore();
  // console.log('pp is',allProducts.products);
  // console.log('category data is', categories[0]);
  // console.log('produxts', allProducts,filters,search);


  const [cheak, setcheak] = useState<string[]>([]);


  const handleChekedRow = (id: string) => {
    console.log(id);

    setcheak((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const handleCheakAll = () => {
    if (cheak.length == allProducts.products.length) {
      setcheak([]);
    } else {
      setcheak(allProducts.products.map((r) => r.id));
    }

  }

  const handleEditClick = () => {
    router.push('/edit_product')
  }

  const fetchCategorieNameById = (id: string): string | undefined => {

    const category = findCategoryById(categories[0], id);

    if (category) {
      // console.log("Found:", category.name);
    } else {
      console.log("Not found");
    }
    return category?.name;
  }

  const flatCategories = useMemo(
    () => flattenCategories(categories[0]),
    [categories[0]]
  );
  // console.log('flat is', flatCategories);

  const getcatbyid = (id:string) =>{

    // console.log(flatCategories,id);
    const cat = flatCategories.find((cur)=>cur.id === id);
    console.log(cat);

    console.log('rse is',cat?.name);
    
    return cat?.name;

  }


  return (
    <Table className="w-[1744px] border-collapse border-separate border-spacing-y-[10px] h-auto">
      <TableHeader className="rounded-[22px] shadow-[0px_0px_4px_0px_#00000040] h-[42px]">
        <TableRow className="rounded-[22px] ">
          <TableHead className='flex flex-row gap-[8px] items-center'><Checkbox checked={allProducts.products.length === cheak.length} onCheckedChange={() => handleCheakAll()} /><p>product</p></TableHead>
          <TableHead className='text-14-md'>Categorie</TableHead>
          <TableHead className='text-14-md'>Price</TableHead>
          <TableHead className='text-14-md'>Stock</TableHead>
          <TableHead className='text-14-md'>Status</TableHead>
          <TableHead className='text-14-md'>Date</TableHead>
          <TableHead className='text-14-md'>Action</TableHead>
        </TableRow>
      </TableHeader>

      {allProducts.products && <TableBody className='text-14-md-52'>
        {allProducts.products.map((item, index) => (

          <TableRow className="shadow-[0px_0px_2px_0.2px_#00000040] h-[42px] rounded-[22px] mb-[10px] " key={index}>
            <TableCell className='flex flex-row gap-[8px] mt-[3px]'>
              <Checkbox
                checked={cheak.includes(item.id)}
                onCheckedChange={() => handleChekedRow(item.id)}
              />
              <p className='flex items-center mt-[3px]'>{item.name}</p>
            </TableCell>
            <TableCell>
              {/* {fetchCategorieNameById(item.parentCategoryId)} */}
              {getcatbyid(item.parentCategoryId)}
            </TableCell>
            <TableCell>
              ₹{item.price}
            </TableCell>
            <TableCell className='flex flex-row gap-[8px] items-center justify-center'>
              {item.quantity < 0 ? <Image src='/close-circle.svg' height={18} width={18} className='size-[18px]' alt='img' /> : <Image src='/tick-circle.svg' height={18} width={18} className='size-[18px]' alt='img' />}
              <p className='pt-[2px]'>{item.quantity}</p>
            </TableCell>

            <TableCell className=''>
              <div className='flex flex-row items-center justify-center gap-[8px]'>

                {item.status === 'DRAFT' ? <Image src='/close-circle.svg' height={18} width={18} className='size-[18px]' alt='img' /> : <Image src='/tick-circle.svg' height={18} width={18} className='size-[18px]' alt='img' />}
                <p className=''>{item.status}</p>
              </div>
            </TableCell>

            <TableCell>
              {formatDate(item.createdAt)}
            </TableCell>

            <TableCell className='flex flex-row gap-[10px] justify-center'>
              <Image src='/eye.svg' height={20} width={20} alt='eye' />
              <Image src='/edit.svg' height={20} width={20} alt='eye' onClick={() => handleEditClick()} />
              <Image src='/trash.svg' height={20} width={20} alt='eye' onClick={() => (alert('want to delete it?'))} />
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
      }

    </Table>
  )
}

export default ProductTable