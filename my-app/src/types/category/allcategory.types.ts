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


interface cat{
  id?: string;
  name: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface CategoryStore{
    categorie:Category_[],
    categories:cat[][],
    loading:boolean,
    error:string,
    responce:allCategoryType,
    fetchcategories:()=>void,
    fetchCategorieById:(id:string)=>void,
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
