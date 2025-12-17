'use client'
import React, { useState, useEffect } from 'react'
import Header from '@/components/layout/cat_mng/Header'
import { S_filter, H_filter, Add, Refresh, Export } from '@/components/ui/Buttons'
import Serch_bar from '@/components/ui/Serch_bar'
import Filterbar from '@/components/review/FilterBar'
import ReviewTable from '@/components/review/ReviewTable'
import { useProductStore } from '@/stores/product/product'
// import { Pagination } from '@/components/ui/Pagination'
import { CustomPagination } from '@/components/ui/CustomPagination'
import { FilterDropdown } from '@/components/product/FilterDropdown'
import { useRouter } from 'next/navigation'
import { review_data } from '@/components/review/data'
import Image from 'next/image'
import Box from '@/components/dashboard/box'

const Star = () => {
    return (
        <div className='flex flex-row gap-[5px]'>
            {Array.from({ length: 4 }).map((_, i) => (
                <Image
                    key={i}
                    src="/black-star.svg"
                    alt="star"
                    height={18}
                    width={18}
                    className="size-[18px]"
                />
            ))
            }
            <Image src='/empty-star.svg' alt='star' height={18} width={18} className='size-[18px]' />
        </div>
    )
}

const Label = () => {
    return (
        <h1 className='bg-black  rounded-full text-white font-inter text-[12px] w-[119px] text-center h-[23px] flex items-center justify-center'>Need Responsive</h1>
    )
}

const box_data = [
    { title: 'Average Rating', number: '4.6', src: '/star.svg', com: Star },
    { title: 'Average Rating', number: '0', src: '/star.svg', desc: '+12.6% this month' },
    { title: 'Average Rating', number: '0', src: '/star.svg', com: Label },
    { title: 'Average Rating', number: '0', src: '/star.svg', desc: '72% of total' },
]

const Orders = () => {
    const router = useRouter();

    const [filterBtn, setFilterBtn] = useState<string>('show');
    const { allProducts, handleFetchProduct, loading, message, success, filters, setFilter, pagination ,search} = useProductStore();

    // useEffect(()=>{
    //   const fetchProduct = async () =>{
    //     await handleFetchProduct();
    //   }
    //   fetchProduct();
    // },[filters])

    const handleRefresh = async () => {
        // await handleFetchProduct();    
    }

    console.log('loading is', loading, message, success);

    const handleAddClick = () => {
        //   router.push('/add_product');
    }



    return (

        <div className='flex flex-col gap-[32px]'>
            <Header
                title='Review & Rating'
                desc="Monitor and respond to cutomer reviews"
                b1={filterBtn !== 'show' ? <S_filter onClick={() => setFilterBtn(filterBtn === 'show' ? 'hide' : 'show')} /> : <H_filter onClick={() => setFilterBtn(filterBtn === 'show' ? 'hide' : 'show')} />}
                b2={<Refresh onClick={handleRefresh} loading={loading} />}
                b3={<Export onClick={handleAddClick} />}
            />

            <div className='bg-white rounded-xl p-[20px] flex flex-col gap-[20px] w-[1784px] min-h-[710px] shadow-[0px_2px_2px_0px_#05050640,2px_0px_2px_0px_#05050640,inset_0px_2px_2px_0px_#05050640,inset_2px_0px_2px_0px_#05050640]'>
                <div className='flex flex-row justify-between'>

                    <Serch_bar value={search} onChange={(e) => setFilter('search', e.target.value)} />
                    <div className='flex flex-row gap-[10px]'>
                        <FilterDropdown
                            label="Date created"
                            filterKey="stock_level"
                            options={[
                                { label: "Date created", value: "in_stock" },
                                { label: "date updated", value: "low_stock" },
                            ]}
                        />
                        <FilterDropdown
                            label="Ascending"
                            filterKey="status"
                            options={[
                                { label: "Ascending", value: "ACTIVE" },
                                { label: "Descending", value: "INACTIVE" },
                            ]}
                        />
                    </div>
                </div>
                {filterBtn === 'show' && <Filterbar />}
                <div className='flex flex-row gap-[16px]'>
                    {
                        box_data.map((cur, index) => (
                            <Box key={index} className='h-[144px] w-[434px]' title={cur.title} number={cur.number} desc={cur.desc} src={cur.src} com={cur.com} />
                        ))
                    }
                </div>
                <ReviewTable />
                {/* {console.log('filters is',filters)} */}
            </div>



            <div className=' w-[1784px] flex flex-row justify-between '>
                <span className='flex w-[200px] text-12-nml'>

                    {/* {(pagination.page * pagination.limit)-(pagination.limit-1)}  to  { (pagination.page * pagination.limit)-(pagination.limit-1)+(allProducts.products.length-1)}  of {pagination.total} */}
                    1 to  10  of 10

                </span>

                <div className='shrink-0'>

                    <CustomPagination
                        currentPage={1}
                        totalPages={10}
                    // onPageChange={(page)=>setFilter('page',page)}
                    />
                </div>

            </div>

        </div>
    )
}


export default Orders;