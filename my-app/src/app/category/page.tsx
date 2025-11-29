'use client'
import React, { useEffect, useState } from 'react'
import { useCategoryStore } from '@/stores/category/category'
import { formatDate } from '@/utils/date';
import Link from 'next/link';
const page = () => {

    const { categories, loading, error, fetchcategories, fetchCategorieById, categorie, handleDelCategory } = useCategoryStore();
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
                                            <button onClick={() => item.id && fetchCategorieById(item.id)} className='hover:text-red-800 cursor-pointer' disabled={loading}>View</button>
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
                                            <button onClick={() => item.id && handleDelCategory(item.id)} className='hover:text-red-900 '>Trash</button>
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
            {categorie &&
                <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">{categorie.name}</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                <span className="font-mono text-xs text-gray-600">/{categorie.slug}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {categorie.isActive ? (
                                <p className="bg-green-100 text-green-800">Active</p>
                            ) : (
                                <p className="bg-red-100 text-red-800">Inactive</p>
                            )}

                        </div>
                    </div>

                    {/* Top meta */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Left card */}
                        <div className="space-y-3">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-start gap-4">
                                    

                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Store:</span>{" "}
                                            <span className="font-mono text-xs text-gray-600">{categorie.storeId ?? "—"}</span>
                                        </p>
                                        
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Parent categorie ID:</span>{" "}
                                            <span className="font-mono text-xs text-gray-600">
                                                {categorie.parentcategorieId ?? "—"}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-800">Description</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {categorie.desc ?? <span className="italic text-gray-400">No description</span>}
                                </p>
                            </div>
                        </div>

                        {/* Right card: raw IDs + attributes */}
                        <div className="space-y-3">
                            <div className="p-4 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-800">Identifiers</h3>

                                <dl className="mt-3 grid grid-cols-1 gap-y-2 text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">categorie ID</dt>
                                        <dd className="font-mono text-gray-800">{categorie.id}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Slug</dt>
                                        <dd className="font-mono text-gray-800">{categorie.slug}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-800">Attributes</h3>
                                {(!categorie.attributes || categorie.attributes.length === 0) ? (
                                    <p className="mt-2 text-sm text-gray-500 italic">No attributes defined.</p>
                                ) : (
                                    <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto text-gray-700">
                                        {JSON.stringify(categorie.attributes, null, 2)}
                                    </pre>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                            <p className="text-sm text-gray-500">{categorie.filters.length} filter(s)</p>
                        </div>

                        <div className="mt-4 space-y-4">
                            {categorie.filters.map((f,index) => (
                                <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-medium text-gray-800">{f.name}</h3>
                                                <p className="bg-indigo-100 text-indigo-800">{f.type}</p>
                                                {f.isRequired && <p className="bg-yellow-100 text-yellow-800">Required</p>}
                                            </div>
{/* 
                                            <p className="mt-2 text-xs text-gray-500">
                                                ID: <span className="font-mono text-xs text-gray-700">{f.id}</span>
                                            </p> */}

                                            <div className="mt-2 text-xs text-gray-500 space-y-1">
                                                {/* <div>
                                                    <span className="font-medium text-gray-600">GlobalcategorieId:</span>{" "}
                                                    <span className="font-mono">{f.globalcategorieId ?? "—"}</span>
                                                </div> */}
                                                {/* <div>
                                                    <span className="font-medium text-gray-600">categorieId:</span>{" "}
                                                    <span className="font-mono">{f.categorieId ?? "—"}</span>
                                                </div> */}
                                                {/* <div className="flex gap-4 mt-2">
                                                    <div className="text-gray-600">
                                                        <div className="text-xs">Created</div>
                                                        <div className="text-xs font-mono text-gray-700">{formatDate(f.createdAt)}</div>
                                                    </div>
                                                    <div className="text-gray-600">
                                                        <div className="text-xs">Updated</div>
                                                        <div className="text-xs font-mono text-gray-700">{formatDate(f.updatedAt)}</div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>

                                        
                                    </div>

                                    {/* Options rendered as chips (no dropdown) */}
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Options</h4>

                                        {f.options.length === 0 ? (
                                            <div className="text-sm text-gray-500 italic">— no options available —</div>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {f.options.map((opt) => (
                                                    <span
                                                        key={opt}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200"
                                                    >
                                                        {opt}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer: raw JSON for debugging */}
                    <div className="mt-6">
                        <details className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <summary className="text-sm font-medium text-gray-800 cursor-pointer">Raw JSON</summary>
                            <pre className="mt-3 text-xs overflow-auto p-2 bg-white border rounded">{JSON.stringify(categorie, null, 2)}</pre>
                        </details>
                    </div>
                </div>

            }
        </div>
    )
}

export default page