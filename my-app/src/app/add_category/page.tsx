'use client'
import React, { useState,useRef } from 'react';
import { Toggle } from '@/components/ui/Toggle';
import Image from 'next/image';
import { Category_ } from '@/types/category/cat_update.types';
import Header from '@/components/layout/cat_mng/Header';
import { Cancel, Create } from '@/components/ui/Buttons';
import { Filter, Attribute } from '@/types/category/cat_update.types';
import { useCategoryStore } from '@/stores/category/category';
import { useRouter } from "next/navigation";
import { useThemeStore } from '@/stores/theme/theme';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectIcon,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/Button';
// const Toggle = ({ checked, onCheckedChange }) => (
//   <button
//     type="button"
//     onClick={() => onCheckedChange(!checked)}
//     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//       checked ? 'bg-blue-600' : 'bg-gray-300'
//     }`}
//   >
//     <span
//       className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//         checked ? 'translate-x-6' : 'translate-x-1'
//       }`}
//     />
//   </button>
// );



const CategoryForm = () => {

      const router = useRouter();

    const {createCategory,loading} = useCategoryStore();

    const {theme,setTheme} = useThemeStore();
    console.log('thme is',theme);
    const [formState, setFormState] = useState<Category_>({
        name: '',
        slug: '',
        parent_category_id: '',
        sort_order: 1,
        desc: '',
        image_url: '',
        filters: [],
        attributes: [],
        is_active: true,
    });

    const [newFilterName, setNewFilterName] = useState<string>("");
    const [newFilterType, setNewFilterType] = useState<"SELECT" | "MULTISELECT" | "INPUT">("INPUT");
    const [newFilterOption, setNewFilterOption] = useState<string>("");
    const [newFilterOptions, setNewFilterOptions] = useState<string[]>([]);
    const [newFilterRequired, setNewFilterRequired] = useState<boolean>(false);

    const [newAttrName, setNewAttrName] = useState<string>("");
    const [newAttrType, setNewAttrType] = useState<"TEXT" | "NUMBER" | "SELECT">("TEXT");
    const [newAttrDefault, setNewAttrDefault] = useState<string>("");
    const [newAttrDefaults,setNewAttrDefaults]=useState<string[]>([]);
    const [newAttrRequired, setNewAttrRequired] = useState<boolean>(false);

    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagePreview(url);

    setFormState(prev => ({
        ...prev,
        image_url: url,
    }));
};



    const addFilterOption = () => {
        if (!newFilterOption.trim()) return;
        setNewFilterOptions(prev => [...prev, newFilterOption.trim()]);
        setNewFilterOption("");
    };

    const addAttributeOption = () => {
        if (!newAttrDefault.trim()) return;
        setNewAttrDefaults(prev => [...prev, newAttrDefault.trim()]);
        setNewAttrDefault("");
    };


    const addFilter = () => {
        if (!newFilterName) return alert("Filter name is required");

        const newFilter: Filter = {
            name: newFilterName,
            type: newFilterType,
            options: newFilterOptions,
            isRequired: newFilterRequired
        };

        setFormState(prev => {
            const updatedFilters = [...prev.filters, newFilter];
            console.log("Updated filters:", updatedFilters); // CORRECT LOG
            return { ...prev, filters: updatedFilters };
        });

        // reset UI
        setNewFilterName("");
        setNewFilterType("SELECT");
        setNewFilterOption("");
        setNewFilterOptions([]);
        setNewFilterRequired(false);
    };

    const addAttribute = () => {
    if (!newAttrName) return alert("Attribute name is required");

    const newAttribute: Attribute = {
        name: newAttrName,
        type: newAttrType,
        options: newAttrDefaults,    // ARRAY OF OPTIONS
        default_value: newAttrDefault, // SINGLE DEFAULT VALUE
        isRequired: newAttrRequired
    };

    const deleteFilter = (id:number) =>{
        setFormState(prev => ({
        ...prev,
        attributes: prev.filters.filter((_, i) => i !== index)
    }));
    }



    setFormState(prev => {
        const updatedAttributes = [...prev.attributes, newAttribute];
        console.log("Updated attributes:", updatedAttributes);
        return { ...prev, attributes: updatedAttributes };
    });

    // reset inputs
    setNewAttrName("");
    setNewAttrType("TEXT");
    setNewAttrDefault("");      // reset default
    setNewAttrDefaults([]);     // reset options
    setNewAttrRequired(false);
};


    const hanndleCancel = () =>{
        router.back();
    }

    const [activeField, setActiveField] = useState(null);

    const updateFormState = (field, value):void=> {
        setFormState(prev => ({ ...prev, [field]: value }));
    };


    const getActiveFieldStyle = (fieldName):string => {
        return activeField === fieldName
            ? 'border-blue-500 shadow-[0px_2px_2px_0px_#05050640,0px_2px_2px_0px_#05050640_inset,2px_0px_2px_0px_#05050640,2px_0px_2px_0px_#05050640_inset]'
            : 'border-[#4D4F5240]';
    };

    const handlecreatecat = async():void =>{
        console.log('data...',formState);
        console.log(formState.name);
        if(formState.name === "") return;
        await createCategory(formState);
        console.log();
        
    }
    const deleteAttribute = (index: number) => {
    setFormState(prev => ({
        ...prev,
        attributes: prev.attributes.filter((_, i) => i !== index)
    }));
    };

    const deleteFilter = (index:number) =>{
        
        setFormState(prev => ({
        ...prev,
        filters: prev.filters.filter((_, i) => i !== index)
    }));
    }

    const [attOpen,setattOpen]=useState(false);
    const [open,setOpen]=useState(false);

    return (
        <>

            <div className='mb-[30px]'>
                <Header b1={<Cancel onClick={hanndleCancel}/>} b2={<Create onClick={handlecreatecat} loading={loading} /> } title='Create New Category' />
            </div>


            <div className={`min-h-screen bg-white p-[20px] w-[1784px] rounded-[16px] shadow-[0px_2px_2px_0px_#05050640,inset_0px_2px_2px_0px_#05050640,2px_0px_2px_0px_#05050640,inset_2px_0px_2px_0px_#05050640]`}>

                <div className="grid grid-cols-2 gap-[16px] mb-8">
                    {/* Name Field */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className="text-22-md-506 ">
                            Name
                        </label>
                        <Input
                            type="text"
                            value={formState.name}
                            onChange={(e) => updateFormState('name', e.target.value)}
                            onFocus={() => setActiveField('name')}
                            onBlur={() => setActiveField(null)}
                            placeholder="Kurti"
                            className={`text-16-nm w-full px-4 py-2.5 rounded-[16px] border-[0.5px] h-[52px] ${getActiveFieldStyle('name')} outline-none transition-all`}
                        />
                    </div>

                    {/* Parent Category Field */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className="text-22-md-506 ">
                            Parent Category
                        </label>
                        <Input
                            type="text"
                            value={formState.parent_category_id}
                            onChange={(e) => updateFormState('parent_category_id', e.target.value)}
                            onFocus={() => setActiveField('parent_category_id')}
                            onBlur={() => setActiveField(null)}
                            placeholder="enter parent parent category id(optional)"
                            className={`text-16-nm w-full px-4 py-2.5 rounded-[16px] border-[0.5px] h-[52px] ${getActiveFieldStyle('parent_category_id')} outline-none transition-all`}
                        />
                    </div>
                </div>

                {/* Slug and Sort Order */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {/* Slug Field */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className="text-22-md-506 ">
                            Slug
                        </label>
                        <Input
                            type="text"
                            value={formState.slug}
                            onChange={(e) => updateFormState('slug', e.target.value)}
                            onFocus={() => setActiveField('slug')}
                            onBlur={() => setActiveField(null)}
                            placeholder="Kurti"
                            className={`text-16-nm px-[10px] flex items-center w-[864px] h-[52px] rounded-[16px] border-[0.5px] ${getActiveFieldStyle('slug')} outline-none transition-all`}
                        />
                        <p className="text-16-nm">URL-friendly identifier for the category</p>
                    </div>

                    {/* Sort Order Field */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className="text-22-md-506 ">
                            Sort Order
                        </label>
                        <Input
                            type="number"
                            value={formState.sort_order}
                            onChange={(e) => updateFormState('sort_order', e.target.value)}
                            onFocus={() => setActiveField('sort_order')}
                            onBlur={() => setActiveField(null)}
                            className={`w-[864px] h-[52px] px-[10px] flex items-center rounded-[16px] border-[0.5px] ${getActiveFieldStyle('sortOrder')} outline-none transition-all`}
                        />
                        <p className="text-16-nm">Lower numbers appear first</p>
                    </div>
                </div>

                {/* Description and Category Image */}
               <div className="flex flex-row gap-[16px] mb-[50px]">
    
    {/* Description */}
    <div className="flex flex-col gap-[10px] flex-1">
        <label className="text-22-md-506">Description</label>
        <Textarea
            value={formState.desc}
            onChange={(e) => updateFormState('desc', e.target.value)}
            placeholder="Enter your description"
            rows={6}
            className="h-[226px] rounded-[16px] border-[0.5px] px-[10px] py-[16px] outline-none resize-none"
        />
    </div>

    {/* Category Image */}
    <div className="flex flex-col gap-[10px] flex-1">
        <label className="text-22-md-506">Category Image</label>

        <div className="h-[226px] rounded-[16px] border border-[#4D4F5240] flex overflow-hidden">
            {imagePreview ? (
                <>
                    <div className="w-1/2 h-full">
                        <Image src={imagePreview} width={432} height={226} className="w-full h-full object-cover" alt="preview" />
                    </div>
                    <div className="w-1/2 h-full flex flex-col items-center justify-center gap-[10px] cursor-pointer hover:bg-gray-50"
                         onClick={() => fileInputRef.current?.click()}>
                        <Image src='/export.svg' height={38} width={38} alt='upload' />
                        <p className="text-16-nm text-center">Click to replace image</p>
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-[10px] cursor-pointer hover:bg-gray-50"
                     onClick={() => fileInputRef.current?.click()}>
                    <Image src='/export.svg' height={38} width={38} alt='upload' />
                    <p className="text-16-nm text-center">Drop images here or click to browse</p>
                </div>
            )}
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
    </div>

</div>

                {/* Category Filters Section */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {/* Category Filters */}
                    <div className={`${newFilterName ? "max-h-[302px]":"max-h-[202px]"} `}>
                        <h3 className="text-22-md-506 mb-[10px]">Category Filters</h3>
                        
                            <div className="h-full w-[864px] flex flex-col  justify-center items-center border-[0.5px] border-[#4D4F5240] rounded-[16px] p-[20px]">
                                {formState.filters.length === 0 ? (
                                    <div className='flex flex-col gap-[10px] justify-center items-center text-center'>
                                    <Image src='/filter38.svg' height={38} width={38} alt='filter' className='size-[38px]' />
                                    <p className="text-16-nm">No filters added yet</p>
                                    <p className="text-16-nm text-[#6B7280]">
                                        Add filters to help customers narrow down products in this category
                                    </p>
                                    </div>
                                ) : (
                                    <div className="w-full flex flex-col justify-start align-start gap-4 overflow-y-auto">
                                        {formState.filters.map((cur, index) => (
                                            <div key={index}>
                                            <p className='text-18-md-6d9 mb-[10px]'>{cur.name}</p>
                                            <div className='flex flex-row justify-between'>
                                                <div className='flex flex-row gap-[16px]'>
                                                {cur.options.map((op, idx) => (
                                                    <div key={idx} className='p-[10px] border-[1px] border-[#050506] rounded-[10px]'>
                                                    <p className='text-16-nm'>{op}</p>                 {/* Fixed: was op[index] → now op */}
                                                    </div>
                                                ))}
                                                </div>   
                                                <div className='flex flex-row gap-[16px] items-center'>
                                                <p className='text-14-nml-506 border-[1px] border-[#050506] py-[2px] px-[6px]  rounded-[10px]'>{cur.type}</p>
                                                <Image src='/trash-black.svg' height={20} width={20} alt='trash' className='size-[20px]' onClick={()=>deleteFilter(index)}/>
                                                </div>
                                            </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        
                    </div>

                    {/* Add New Filter */}
                    <div>
                        <h3 className="text-22-md-506 mb-[10px]">Add New Filter</h3>

                        <div className={`${newFilterName ? 'h-[302px]':'h-[202px]'}  w-[864px] p-[20px] border-[0.5px] border-[#4D4F5240] rounded-[16px]`}>
                            <div className="flex flex-col gap-[30px]">

                                <div className="flex flex-row gap-[16px]">
                                    {/* Filter Name */}
                                    <div className="flex flex-col gap-[10px]">
                                        <label className="text-16-md-f52">Filter Name</label>
                                        <input
                                            type="text"
                                            value={newFilterName}
                                            onChange={(e) => setNewFilterName(e.target.value)}
                                            placeholder="e.g., size, color"
                                            className="w-[404px] h-[52px] px-3 py-2 rounded-[16px] border-[0.5px] border-[#4D4F5240] outline-none text-16-md-f52"
                                        />
                                    </div>

                                    {/* Filter Type */}
                                     <div className="flex flex-col gap-[10px]">
      <label className="text-16-md-f52">Filter Type</label>

      <Select
        value={newFilterType}
        onValueChange={setNewFilterType}
        open={open}
        onOpenChange={setOpen}
        className='min-h-[52px]'
      >
        <SelectTrigger className="w-[404px] min-h-[52px] px-3 py-2 rounded-[16px] border border-[#4D4F5240] bg-white text-16-nm relative">
          <SelectValue placeholder="Select filter type" />

          {/* Rotating Arrow */}
          <Image
            src='/arrow-down.svg' height={22} width={22} alt='down'
            size={22}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200
            ${open ? "rotate-180" : "rotate-0"}`}
          />
        </SelectTrigger>

        <SelectContent className="rounded-xl">
          <SelectItem value="INPUT">Text</SelectItem>
          <SelectItem value="SELECT">Select</SelectItem>
          <SelectItem value="MULTISELECT">Multiselect</SelectItem>
        </SelectContent>
      </Select>
    </div>
                                </div>

                                {/* Filter Options */}
                                {newFilterName && newFilterType && <div className="flex flex-col gap-[10px] mb-[30px]">
                                    <p className="text-16-md-f52">Filter Options</p>

                                    <div className="flex flex-row gap-[10px]">
                                        <input
                                            type="text"
                                            value={newFilterOption}
                                            onChange={(e) => setNewFilterOption(e.target.value)}
                                            placeholder="enter option"
                                            className="rounded-[16px] flex items-center px-[10px] text-16-md-f52 h-[52px] w-[762px] border-[0.5px] border-[#4D4F5240]"
                                        />
                                        <button
                                            onClick={addFilterOption}
                                            className="flex items-center justify-center h-[52px] w-[52px] rounded-[16px] border-[0.5px] border-[#4D4F5240]"
                                        >
                                            <Image src="/add.svg" height={24} width={24} className="size-[24px]" alt="add" />
                                        </button>
                                    </div>
                                </div>}
                            </div>

                            {/* Required + Add Filter Button */}
                            <div className={`flex items-center justify-between ${newFilterName ? "":"mt-[30px]"}`}>
                                <div className="flex items-center gap-[12px]">
                                    <Toggle
                                        checked={newFilterRequired}
                                        onCheckedChange={setNewFilterRequired}
                                    />
                                    <span className="text-16-md-f52">Required Filter</span>
                                </div>

                                <Button
                                    onClick={addFilter}
                                    className="w-[130px] h-[40px] bg-white border-2 border-[#050506] rounded-[14px] text-14-nml-506 flex justify-center items-center"
                                >
                                    Add Filter
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Category Attributes Section */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Category Attributes */}
                    <div>
                    <h3 className="text-22-md-506 mb-[10px]">Category Attributes</h3>

                    <div className="h-[302px] w-[864px] flex flex-col gap-[10px] justify-center items-center border-[0.5px] border-[#4D4F5240] rounded-[16px]">

                        {formState.attributes.length === 0 ? (
                            <div className="flex flex-col justify-center items-center gap-[10px]">
                                <Image src="/setting38.svg" height={38} width={38} className="size-[38px]" alt="setting" />
                                <p className="text-16-nm mb-1">No attributes added yet</p>
                                <p className="text-16-nm">Add attributes to define product characteristics in this category</p>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col justify-start align-start gap-4 overflow-y-auto p-[20px]">
                                {formState.attributes.map((cur, index) => (
                                    <div key={index}>
                                        <p className="text-18-md-6d9 mb-[10px]">{cur.name}</p>

                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-row gap-[16px]">
                                                {cur.options.map((op, idx) => (
                                                    <div key={idx} className="p-[10px] border-[1px] border-[#050506] rounded-[10px]">
                                                        <p className="text-16-nm">{op}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-row gap-[16px] items-center">
                                                <p className="text-14-nml-506 border-[1px] border-[#050506] py-[2px] px-[6px] rounded-[10px]">
                                                    {cur.type}
                                                </p>
                                                <Image src="/trash-black.svg" height={20} width={20} alt="trash" className="size-[20px]" onClick={()=>deleteAttribute(index)}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>


                    {/* Add New Attribute */}
                    <div>
                        <h3 className="text-22-md-506 mb-[10px]">Add New Attribute</h3>
                        <div className="p-[20px] h-[302px] w-[864px] flex flex-col gap-[30px] border-[0.5px] border-[#4D4F5240] rounded-[16px]">
                            <div className='flex flex-row gap-[16px]'>

                                <div className="flex flex-col gap-[10px]">
                                    <label className="text-16-md-f52 flex flex-col gap-[10px]">Attribute Name</label>
                                    <input
                                        type="text"
                                        value={newAttrName}
                                        onChange={(e) => setNewAttrName(e.target.value)}
                                        placeholder="e.g., weight, material"
                                        className="w-[404px] h-[52px] px-3 py-2 rounded-[16px] border-[0.5px] border-[#4D4F5240] outline-none text-16-md-f52"
                                    />
                                </div>
                                {/* <div className="  w-[404px] flex flex-col gap-[10px]">
                                    <label className="text-16-md-f52 ">Attribute Type</label>
                                    <select
                                        value={newAttrType}
                                        onChange={(e) => setNewAttrType(e.target.value as any)}
                                        className="h-[52px] w-[404px] px-3 py-2 rounded-[16px] border-[0.5px] border-[#4D4F5240] outline-none text-sm bg-white text-16-nm"
                                    >
                                        <option value="TEXT">SELECT</option>
                                        <option value="TEXT">Text</option>
                                        <option value="NUMBER">Number</option>
                                        <option value="SELECT">Boolean</option> {/* placeholder — you will update this later */}
                                    {/* </select> */}
                                {/* </div> */} 
                                <div className="w-[404px] flex flex-col gap-[10px]">
                                <label className="text-16-md-f52">Attribute Type</label>

                                <Select
                                    value={newAttrType}
                                    onValueChange={setNewAttrType}
                                    open={attOpen}
                                    onOpenChange={setattOpen}
                                    className='min-h-[52px]'
                                >
                                    <SelectTrigger className="min-h-[52px] w-[404px] px-3 py-2 rounded-[16px] border border-[#4D4F5240] text-16-nm relative">
                                    <SelectValue placeholder="SELECT" className='h-[52px]'/>

                                    {/* Arrow Icon */}
                                    <Image
                                        src='/arrow-down.svg' height={20} width={20} alt='img'
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200
                                        ${attOpen ? "rotate-180" : "rotate-0"}`}
                                        size={20}
                                    />
                                    </SelectTrigger>

                                    <SelectContent className="rounded-xl">
                                    <SelectItem value="TEXT">Text</SelectItem>
                                    <SelectItem value="NUMBER">Number</SelectItem>
                                    <SelectItem value="BOOLEAN">Boolean</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <label className="text-16-md-f52 mb-2">Default Value (Optional)</label>
                                <div className='flex flex-row gap-[10px]'>
                                
                                <input
                                    type="text"
                                    value={newAttrDefault}
                                    onChange={(e) => setNewAttrDefault(e.target.value)}
                                    placeholder="Enter default value"
                                    className="w-[762px] h-[52px] px-3 py-2 rounded-[16px] border-[0.5px] border-[#4D4F5240] outline-none text-16-md-f52"
                                />
                                
                                 <button
                                            onClick={addAttributeOption}
                                            className="flex items-center justify-center h-[52px] w-[52px] rounded-[16px] border-[0.5px] border-[#4D4F5240]"
                                        >
                                            <Image src="/add.svg" height={24} width={24} className="size-[24px]" alt="add" />
                                        </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Toggle
                                        checked={newAttrRequired}
                                        onCheckedChange={setNewAttrRequired}
                                    />

                                    <span className="text-16-md-f52">Required Attribute</span>
                                </div>
                                <Button
                                    onClick={addAttribute}
                                    className="w-[130px] h-[40px] bg-white border-2 border-[#050506] rounded-[14px] text-14-nml-506 flex justify-center items-center"
                                >
                                    Add Attribute
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </>
    );
};

export default CategoryForm;