// types/category.ts  (or put inside your service file)
import { Category_ } from "./cat_update.types";

export interface Category {
  id: string;
  name: string;
  slug: string;
  desc: string | null;
  imageUrl: string;
  level: number;
  path: string;
  sortOrder: number | null;
  isActive: boolean;
  createdAt: string; 
  updatedAt: string; 
  globalCategoryId: string;
  ParentCategoryId: string | null;

  children: Category[];
}

// Full API response
export interface allCategoryType {
  statusCode: number;
  data: Category[];
  message: string;
  success: boolean;
}

interface cat {
  id?: string;
  name: string;
  isActive?: boolean;
  createdAt?: string | null;   
  
}

export interface CategoryStore{
    categorie:Category_ | null,
    // categorie:getCatByIdTypes,
    categories:cat[][],
    loading:boolean,
    error:string | null,
    // responce:allCategoryType ,
    fetchcategories:()=>void,
    fetchCategorieById:(id:string)=>void,
    createCategory:(data:CategoryPayload)=>void,
    handleDelCategory:(id:string)=>void,
    handleUpdateCategory:(id:string,catefory:Category_)=>void
}


export interface FilterOption {
  name: string;
  type: "SELECT" | "MULTISELECT" | "INPUT";
  options: string[];
  isRequired: boolean;
}

export interface CategoryPayload {
  name: string;
  image_url: string;
  filter: FilterOption[];
  parent_category_id: string;
}

export interface getCatByIdTypes{
    statusCode:number,
    data:Category_,
    message:string,
    success:string
}

export interface addCatResTypes{
    statusCode:number,
    data:any,
    message:string,
    success:string,
}

export interface delCatResTypes{
    statusCode:number,
    data:any,
    message:string,
    success:string,
}