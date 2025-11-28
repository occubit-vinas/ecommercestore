"use client";

import { useState ,useEffect} from "react";
import { useParams } from "next/navigation";
import { Category_, Filter, Attribute } from "@/types/category/cat_update.types";
import { updateCategory } from "@/servicies/category/category.service";
import { useCategoryStore } from "@/stores/category/category";

export default function UpdateCategoryPage() {

  const {fetchCategorieById,handleUpdateCategory} = useCategoryStore();

  const [initialData,setinitialData]=useState<any>();

  const { slug } = useParams();
  // const storeId = "cmicq2mup0005q6lfjz98h2yd";
  console.log('update_cat is', slug);
  console.log(typeof(slug));
  

useEffect(() => {
  if (!slug || typeof slug !== "string") return;

  const load = async () => {
    const data = await fetchCategorieById(slug);
    setinitialData(data);
  };

  load();
}, [slug]);

  

  const [loading,setloading]=useState(false);

  const [category, setCategory] = useState<Category_>({
    name: "",
    slug: "",
    image_url: "",
    desc: "",
    sort_order: 0,
    is_active: true,
    filters: [
      {
        name: "",
        type: "SELECT",
        options: [""],
        isRequired: false,
      },
    ],
    attributes: [
      {
        name: "",
        type: "TEXT",
        options: [],
        default_value: "",
        isRequired: false,
      },
    ],
    parent_category_id: "",
  });

  const updateField = (field: keyof Category_, value: any) => {
    setCategory({ ...category, [field]: value });
  };

  const updateFilter = <K extends keyof Filter>(
  index: number,
  key: K,
  value: Filter[K]
) => {
  const newFilters = [...category.filters];
  newFilters[index][key] = value; 
  setCategory({ ...category, filters: newFilters });
};


  const addFilterOption = (filterIndex: number) => {
    const updated = [...category.filters];
    updated[filterIndex].options.push("");
    setCategory({ ...category, filters: updated });
  };

  const updateAttribute = <K extends keyof Attribute>(index: number, key: K, value: any) => {
    const updated = [...category.attributes];
    updated[index][key] = value;
    setCategory({ ...category, attributes: updated });
  };

  const addAttributeOption = (attrIndex: number) => {
    const updated = [...category.attributes];
    updated[attrIndex].options.push("");
    setCategory({ ...category, attributes: updated });
  };

  const submitUpdate = async () => {
    if (!slug || typeof slug !== "string") {
    console.error("Slug is missing or invalid");
    return;
  }
      setloading(true);
      await handleUpdateCategory(slug,category);
  };

  return (
    <div className='flex justify-center bg-white '>

      <div className="max-w-[400px] mx-auto p-8 bg-white text-black">
        <p className='text-black'>{slug}</p>
        <h1 className="text-3xl font-bold mb-6">Update Category - <p className='text-black'>{slug}</p></h1>

        <div className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={category.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Slug"
            value={category.slug}
            onChange={(e) => updateField("slug", e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Image URL"
            value={category.image_url}
            onChange={(e) => updateField("image_url", e.target.value)}
          />

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            value={category.desc}
            onChange={(e) => updateField("desc", e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            type="number"
            placeholder="Sort Order"
            value={category.sort_order}
            onChange={(e) => updateField("sort_order", Number(e.target.value))}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={category.is_active}
              onChange={(e) => updateField("is_active", e.target.checked)}
            />
            Active
          </label>

          <input
            className="w-full p-2 border rounded"
            placeholder="Parent Category ID"
            value={category.parent_category_id}
            onChange={(e) => updateField("parent_category_id", e.target.value)}
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Filters</h2>

        <div className="space-y-6">
          {category.filters.map((filter, fIndex) => (
            <div key={fIndex} className="border p-4 bg-gray-50 rounded">
              <input
                className="w-full p-2 border rounded mb-2"
                placeholder="Filter Name"
                value={filter.name}
                onChange={(e) => updateFilter(fIndex, "name", e.target.value)}
              />

              <select
                className="p-2 border rounded"
                value={filter.type}
                onChange={(e) =>
                  updateFilter(fIndex, "type", e.target.value as any)
                }
              >
                <option value="SELECT">SELECT</option>
                <option value="MULTISELECT">MULTISELECT</option>
                <option value="INPUT">INPUT</option>
              </select>

              <label className="flex gap-2 items-center mt-2">
                <input
                  type="checkbox"
                  checked={filter.isRequired}
                  onChange={(e) =>
                    updateFilter(fIndex, "isRequired", e.target.checked)
                  }
                />
                Required
              </label>

              {(filter.type === "SELECT" || filter.type === "MULTISELECT") && (
                <div className="mt-3">
                  {filter.options.map((opt, oIndex) => (
                    <input
                      key={oIndex}
                      className="w-full p-2 border rounded mb-2"
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        updateFilter(
                          fIndex,
                          "options",
                          filter.options.map((o, i) =>
                            i === oIndex ? e.target.value : o
                          )
                        )
                      }
                    />
                  ))}
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded mt-2"
                    onClick={() => addFilterOption(fIndex)}
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Attributes</h2>

        <div className="space-y-6">
          {category.attributes.map((attr, aIndex) => (
            <div key={aIndex} className="border p-4 bg-gray-50 rounded">
              <input
                className="w-full p-2 border rounded mb-2"
                placeholder="Attribute Name"
                value={attr.name}
                onChange={(e) => updateAttribute(aIndex, "name", e.target.value)}
              />

              <select
                className="p-2 border rounded"
                value={attr.type}
                onChange={(e) =>
                  updateAttribute(aIndex, "type", e.target.value as any)
                }
              >
                <option value="TEXT">TEXT</option>
                <option value="NUMBER">NUMBER</option>
                <option value="SELECT">SELECT</option>
              </select>

              {attr.type === "SELECT" && (
                <div className="mt-3">
                  {attr.options.map((opt, oIndex) => (
                    <input
                      key={oIndex}
                      className="w-full p-2 border rounded mb-2"
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        updateAttribute(
                          aIndex,
                          "options",
                          attr.options.map((o, i) =>
                            i === oIndex ? e.target.value : o
                          )
                        )
                      }
                    />
                  ))}
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded mt-2"
                    onClick={() => addAttributeOption(aIndex)}
                  >
                    + Add Option
                  </button>
                </div>
              )}

              <input
                className="w-full p-2 border rounded mt-3"
                placeholder="Default Value"
                value={attr.default_value}
                onChange={(e) =>
                  updateAttribute(aIndex, "default_value", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <button
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
          onClick={submitUpdate}
          disabled={loading}
        >
          Update Category
        </button>
      </div>
    </div>
  );
}
