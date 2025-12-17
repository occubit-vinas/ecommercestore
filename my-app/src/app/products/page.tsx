'use client'
import React, { useState,useEffect } from 'react'
import Header from '@/components/layout/cat_mng/Header'
import { S_filter,H_filter,Add,Refresh } from '@/components/ui/Buttons'
import Serch_bar from '@/components/ui/Serch_bar'
import Filterbar from '@/components/product/Filterbar'
import ProductTable from '@/components/product/ProductTable'
import { useProductStore } from '@/stores/product/product'
// import { Pagination } from '@/components/ui/Pagination'
import { CustomPagination } from '@/components/ui/CustomPagination'
import {useRouter} from 'next/navigation'

const page = () => {
    const router = useRouter();

    const [filterBtn,setFilterBtn]=useState<string>('show');
    const {allProducts,handleFetchProduct,loading,message,success,filters,setFilter,pagination,search,setSearch} = useProductStore();

    useEffect(()=>{
      const fetchProduct = async () =>{
        await handleFetchProduct();
      }
      fetchProduct();
    },[filters])

    useEffect(()=>{
      console.log(search);
      
        const timer = setTimeout(() => {
         handleFetchProduct();
        }, 2000);

        return () => clearTimeout(timer);
    },[search])

    const handleRefresh = async () => {
        await handleFetchProduct();    
    }

    console.log('loading is',loading,message,success);

    const handleAddClick = () => {
      router.push('/add_product');
    }

    console.log('filters is',filters);

  return (

    <div className='flex flex-col gap-[32px]'>
       <Header
       title='Product Management'
       desc="manage your store's product inventory"
        b1={filterBtn !== 'show' ? <S_filter onClick={()=>setFilterBtn(filterBtn === 'show' ? 'hide':'show')}/>:<H_filter onClick={()=>setFilterBtn(filterBtn === 'show' ? 'hide':'show')}/>}
        b2={<Refresh onClick={handleRefresh} loading={loading}/>}
        b3={<Add onClick={handleAddClick}/>}
       /> 

       <div className='bg-white rounded-xl p-[20px] flex flex-col gap-[20px] w-[1784px] min-h-[710px] shadow-[0px_2px_2px_0px_#05050640,2px_0px_2px_0px_#05050640,inset_0px_2px_2px_0px_#05050640,inset_2px_0px_2px_0px_#05050640]'>
            <Serch_bar value={search} onChange={(e)=>setSearch(e.target.value)}/>
            {filterBtn === 'show' && <Filterbar/>}
            {allProducts.products ? <ProductTable/>:<p>loading</p>}
       </div>
      <div className=' w-[1784px] flex flex-row justify-between '>
       {allProducts.products &&  <span className='flex w-[200px] text-12-nml'>

          {/* {(pagination.page * pagination.limit)-(pagination.limit-1)} to{ pagination.page * pagination.limit}  of {pagination.total} */}
          {(pagination.page * pagination.limit)-(pagination.limit-1)}  to  { (pagination.page * pagination.limit)-(pagination.limit-1)+(allProducts.products.length-1)}  of {pagination.total}

        </span>}

        <div className='shrink-0'>

        <CustomPagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={(page)=>setFilter('page',page)}
        />
        </div>

      </div>
    </div>
  )
}

export default page;