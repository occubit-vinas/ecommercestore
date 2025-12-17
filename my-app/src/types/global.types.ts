export type Category = {
  id: string,
  name: string,
  slug:string,
  imageUrl:string,
  path:string,
  isActive:string,
  createdAt:string,
  updatedAt:string,
  globalCategoryId:string,
  parentCategoryId:string,
  children?: Category[];
};
