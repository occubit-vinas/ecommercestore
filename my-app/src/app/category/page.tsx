'use client'
import Header from '@/components/layout/cat_mng/Header';
import { S_filter, H_filter, Refresh, Add } from '@/components/ui/Buttons';
import Cat_table from '@/components/category/Cat_table';
import { redirect } from 'next/navigation';
import { useCategoryStore } from '@/stores/category/category';
import { useState } from 'react';

export default function Page() {

    // const {fetchcategories} = useCategoryStore((s) => s.fetchCategories);
    const { fetchcategories, loading, categorie } = useCategoryStore();
    const handleAddClick = (): void => {
        redirect('/add_category');
    }
    // const fetchcategories = useCategoryStore((s) => s.fetchcategories);
    // const loading = useCategoryStore((s) => s.fetchCategories);

    const handleRefresh = async () => {
        try {
            await fetchcategories();
            console.log("Refreshed");
        } catch (err) {
            console.error(err);
            alert("error");
        }
    };

    const [filterBtn, setFilterBtn] = useState<boolean>(false);


    return (

        <div className='bg-white  text-black  flex flex-col gap-[26px]'>

            <Header b1={filterBtn ? <S_filter onClick={() => { setFilterBtn(!filterBtn) }} /> : <H_filter onClick={() => { setFilterBtn(!filterBtn) }} />} b2={<Refresh onClick={handleRefresh} loading={loading} />} title='Category Management' b3={<Add onClick={handleAddClick} />} desc="Organise your products with categories and manage your inventory" />
            <Cat_table />

            {false &&

                <div className="w-full max-w-5xl mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">{categorie?.name}</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                <span className="font-mono text-xs text-gray-600">/{categorie?.slug}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {categorie?.isActive ? (
                                <p className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">Active</p>
                            ) : (
                                <p className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">Inactive</p>
                            )}
                        </div>
                    </div>

                    {/* Top meta */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Left card */}
                        <div className="space-y-3">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Store:</span>{" "}
                                            <span className="font-mono text-xs text-gray-600">{categorie?.storeId ?? "—"}</span>
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Parent categorie ID:</span>{" "}
                                            <span className="font-mono text-xs text-gray-600">
                                                {categorie?.parentcategorieId ?? "—"}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-800">Description</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {categorie?.desc ?? <span className="italic text-gray-400">No description</span>}
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
                                        <dd className="font-mono text-gray-800">{categorie?.id}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Slug</dt>
                                        <dd className="font-mono text-gray-800">{categorie?.slug}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-800">Attributes</h3>
                                {(!categorie?.attributes || categorie?.attributes.length === 0) ? (
                                    <p className="mt-2 text-sm text-gray-500 italic">No attributes defined.</p>
                                ) : (
                                    <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto text-gray-700">
                                        {JSON.stringify(categorie?.attributes, null, 2)}
                                    </pre>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                            <p className="text-sm text-gray-500">{categorie?.filters?.length || 0} filter(s)</p>
                        </div>

                        <div className="space-y-4">
                            {categorie?.filters?.map((f, index) => (
                                <div key={ index} className="p-4 border rounded-lg bg-white shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-sm font-medium text-gray-800">{f.name}</h3>
                                                <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                                                    {f.type}
                                                </span>
                                                {f.isRequired && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                                        Required
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-2 text-xs text-gray-500">
                                                {/* ID: <span className="font-mono text-xs text-gray-700">{f?.id || ''}</span> */}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Options rendered as chips */}
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Options</h4>
                                        {f.options?.length === 0 ? (
                                            <div className="text-sm text-gray-500 italic">— no options available —</div>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {f.options.map((opt, i) => (
                                                    <span
                                                        key={i}
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
                </div>


            }

        </div>

    )
}
