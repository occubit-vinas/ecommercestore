import { ApiResponse } from "../auth.types";
import { paginationType } from "../ui.types";
import { Pagination } from "../ui.types";
export interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers: headers
}

export interface headers {

    Authorization:string,
    'Content-Type':string
}

export interface productsData  {
    id:number,
    category:string,
    price:number,
    stock:string,
    status:string,
    createdAt:string,
}

// types.ts

export interface Attribute {
  name: string;
  values: string[];
}

export interface ProductSize {
  id: string;
  size: string;
  stock: number;
  sku: string;
  priceModifier: string; // kept as string to match your payload
  attributes: Attribute[];
}

export interface Variant {
  id: string;
  productId: string;
  sku: string;
  price: string;
  comparePrice: string;
  costPrice: string;
  quantity: number;
  images: string[];
  color: string;
  size: string | null;
  material: string;
  style: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  productSizes: ProductSize[];
}

export interface Product_ {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  desc: string;
  price: string;
  costPrice: string;
  comparePrice: string;
  sku: string;
  barcode: string;
  hsnCode: string;
  gst: string;
  brand: string;
  quantity: number;
  trackInventory: boolean;
  lowStockThreshold: number;
  allowBackorder: boolean;
  reserved: number;
  parentCategoryId: string | null;
  status: string;
  isActive: boolean;
  averageRating: string;
  ratingsCount: number;
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  variants: Variant[];
}

export interface ProductsResponseTypes {
  products: Product[];
  pagination: Pagination;
}

export type getProductsTypes = ApiResponse<ProductsResponseTypes>

 

export interface ProductStore {
  filters: ProductFilters;
  search:string,
  pagination:paginationType,
  loading: boolean;
  allProducts: any;
  message:string,
  success:string,
  setFilter: (key: keyof ProductFilters | string, value: string | number | datetype) => void;
  setpagination:(key: keyof paginationType,value: number)=>void
  resetFilters: () => void;
  handleFetchProduct: () => Promise<void>;
  setSearch:(value:string)=>void,
}



export interface ProductFilters {
  categorie: string;
  stock_level: string;
  status: string;
  date: datetype;
  price: string;
  page: number;
  sort: string;
  order: "asc" | "desc";
  limit:number,
  search?:string,
}

export interface datetype {
  from:string | Date | null,
  to:string | Date | null,
}
export interface Product {
  id: number;
  product: string;
  price: number;
  stock: number;
  status: string;
  date: string;
}
