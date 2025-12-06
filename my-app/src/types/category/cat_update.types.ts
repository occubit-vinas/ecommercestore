export interface Filter {
  name: string;
  type: "SELECT" | "MULTISELECT" | "INPUT";
  options: string[];
  isRequired: boolean;
}

export interface Attribute {
  name: string;
  type: "TEXT" | "NUMBER" | "SELECT";
  options: string[];
  default_value: string;
  isRequired: boolean;
}

export interface Category_ {
  id?:string,
  name: string;
  slug: string;
  image_url: string | null;
  desc: string;
  sort_order: number;
  is_active: boolean;
  filters: Filter[];
  attributes: Attribute[];
  parent_category_id: string;
  isActive?:boolean;
  storeId?:string;
  parentcategorieId?:string,
  
}
