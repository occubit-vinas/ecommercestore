'use client'
import { useState } from "react";
// import { CategoryPayload, FilterOption } from "@/types/category";
import { FilterOption, CategoryPayload } from "@/types/category/allcategory.types";
import addcategorie from "@/servicies/category/category.service";
import { useCategoryStore } from "@/stores/category/category";
export default function AddCategoryPage() {

    const { loading, createCategory } = useCategoryStore();

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [parentId, setParentId] = useState("");



    const [filters, setFilters] = useState<FilterOption[]>([
        { name: "", type: "SELECT", options: [""], isRequired: true },
    ]);

    const addFilter = () => {
        setFilters([...filters, { name: "", type: "SELECT", options: [""], isRequired: true }]);
    };

    const updateFilter = (index: number, key: keyof FilterOption, value: any) => {
        const updated = [...filters];
        (updated[index][key] as string) = value;
        setFilters(updated);
    };

    const updateOption = (filterIndex: number, optionIndex: number, value: string) => {
        const updated = [...filters];
        updated[filterIndex].options[optionIndex] = value;
        setFilters(updated);
    };

    const addOption = (filterIndex: number) => {
        const updated = [...filters];
        updated[filterIndex].options.push("");
        setFilters(updated);
    };

    const submitForm = async () => {

        const payload: CategoryPayload = {
            name: name,
            image_url: imageUrl,
            filters: filters,
            parent_category_id: parentId,
        };

        await createCategory(payload);
        // console.log('add cat data is',payload);
        setName('');
        setImageUrl('');
        setParentId('');
        setFilters([
            { name: "", type: "SELECT", options: [""], isRequired: true }
        ]);


    };

    return (
        <div className='w-screen bg-white text-black h-screen flex justify-center'>

            <div className="max-w-3xl  p-8 bg-white w-[400px] ">
                <h1 className="text-3xl font-bold mb-6 flex justify-center">Add Category</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block font-medium">Category Name</label>
                        <input
                            className="w-full mt-1 p-2 border rounded"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='category name'
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Image URL</label>
                        <input
                            className="w-full mt-1 p-2 border rounded"
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder='Image URL'
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Parent Category ID</label>
                        <input
                            className="w-full mt-1 p-2 border rounded"
                            type="text"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                            placeholder='Parent Category ID'
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4 flex justify-center">Filters</h2>

                <div className="space-y-6">
                    {filters.map((filter, fIndex) => (
                        <div key={fIndex} className="border p-4 rounded-lg bg-gray-50">
                            <div className="flex flex-col gap-3">
                                <input
                                    className="p-2 border rounded"
                                    placeholder="Filter Name"
                                    value={filter.name}
                                    onChange={(e) => updateFilter(fIndex, "name", e.target.value)}
                                />

                                <select
                                    className="p-2 border rounded"
                                    value={filter.type}
                                    onChange={(e) =>
                                        updateFilter(
                                            fIndex,
                                            "type",
                                            e.target.value as "SELECT" | "MULTISELECT" | "INPUT"
                                        )
                                    }
                                >
                                    <option value="SELECT">SELECT</option>
                                    <option value="MULTISELECT">MULTISELECT</option>
                                    <option value="INPUT">INPUT</option>
                                </select>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filter.isRequired}
                                        onChange={(e) => updateFilter(fIndex, "isRequired", e.target.checked)}
                                    />
                                    <span className="font-medium">Required</span>
                                </label>

                                {(filter.type === "SELECT" || filter.type === "MULTISELECT") && (
                                    <div className="mt-2">
                                        <h4 className="font-medium mb-2">Options</h4>

                                        <div className="space-y-2">
                                            {filter.options.map((opt, oIndex) => (
                                                <input
                                                    key={oIndex}
                                                    className="w-full p-2 border rounded"
                                                    placeholder={`Option ${oIndex + 1}`}
                                                    value={opt}
                                                    onChange={(e) => updateOption(fIndex, oIndex, e.target.value)}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => addOption(fIndex)}
                                            className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addFilter}
                    className="mt-6 px-4 py-2 bg-gray-700 text-white rounded"
                >
                    + Add Filter
                </button>

                <button
                    onClick={submitForm}
                    className="mt-6 ml-4 px-6 py-2 bg-green-600 text-white rounded"
                    disabled={loading}
                >
                    {!loading ? 'Add Category' : 'Loading'}
                </button>
                {/* <p>{res.statusCode}</p> */}
            </div>
        </div>
    );
}
