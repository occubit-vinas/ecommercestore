'use client'
import React, { useEffect, useState } from 'react'
import { useCategoryStore } from '@/stores/category/category'
import { formatDate } from '@/utils/date';
import Link from 'next/link';
const page = () => {

    const { categories, loading, error, fetchcategories, fetchCategorieById, categorie , handleDelCategory} = useCategoryStore();
    useEffect(() => {
        const func = async () => {
            await fetchcategories();
        }
        func();
    }, [])
    console.log(categories);

    const data = categories.flat();
    console.log('origin', data, loading, error);
    console.log('cat data is', categorie);
    console.log(fetchCategorieById);


    return (

        <div className='bg-white w-screen h-screen text-black'>

            <div className={`bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 h-auto w-[800px]`}>

                {/* Table */}
                <table className="min-w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#F9F4FF]">
                        <tr>
                            <th className=" py-3 px-4 w-1/4 border-gray-300 rounded-l-2xl">
                                category
                            </th>
                            <th className=" py-3 px-4 border-gray-300">Date Created</th>
                            <th className=" py-3 px-4 border-gray-300">
                                Active
                            </th>
                            <th className=" py-3 px-4 border-gray-300 rounded-r-2xl">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {
                            data.map((item, index) => (

                                <tr
                                    key={item.name} // Unique key
                                    className="border-b border-gray-200 text-second "
                                >
                                    <td className="py-3 px-4 w-1/4">{item.name}</td>

                                     <td className="py-3 px-4">{item.createdAt && formatDate(item.createdAt)}</td>
                                    <td className="py-3 px-4">
                                        <div
                                            className={`flex items-center gap-2`}
                                        >

                                            {`${item.isActive === true}` ? <span>Active</span> : <span>inActive</span>}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-3">
                                            {/* <Image
                                                    src="/dashboard/eye.png"
                                                    height={20}
                                                    width={20}
                                                    alt="View"
                                                    className="cursor-pointer"
                                                /> */}
                                            <button onClick={() => item.id &&  fetchCategorieById(item.id)} className='hover:text-red-800 cursor-pointer' disabled={loading}>View</button>
                                            {/* <Image
                                                    src="/dashboard/edit.png"
                                                    height={20}
                                                    width={20}
                                                    alt="Edit"
                                                    className="cursor-pointer"
                                                /> */}
                                            <Link href={`edit_category/${item.id}`}>Edit</Link>
                                            {/* <Image
                                                    src="/dashboard/trash.png"
                                                    height={20}
                                                    width={20}
                                                    alt="Delete"
                                                    className="cursor-pointer"
                                                /> */}
                                            <button onClick={()=> item.id && handleDelCategory(item.id)} className='hover:text-red-900 '>Trash</button>
                                        </div>
                                    </td>
                                </tr>


                            ))
                        }
                    </tbody>
                </table>

            </div>
            {/* {
                fetchCategorieById && (
                    // console.log('cat data is',fetchCategorieById)
                    <h1>new data</h1>
                )
            } */}
        </div>
    )
}

export default page