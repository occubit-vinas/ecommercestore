
// import { getToken } from "@/utils/cookie";
import { BASE_URL,STORE_ID} from "@/config/api";
import { RequestOptions } from "@/types/product/products.types";
import { getProductsTypes } from "@/types/product/products.types";
import { useEffect } from "react";
import { getToken } from "@/utils/cookie";
// import { useProductStore } from "@/stores/product/product";
import { getDecryptedItem } from "@/utils/encryption";

// const TOKEN = localStorage.getItem('accessToken');
const TOKEN = getDecryptedItem('accessToken');
const myHeaders = new Headers();
myHeaders.append("Cookie", `access_token=${TOKEN}`);



// const requestOptions:RequestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow"
// };
const requestOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
};
// const {filters} = useProductStore();

export const fetchAllProducts = async ({page=1,sort,order,status,stock_level,price,limit=6,date,search}:{page:number,limit:number,sort:string,order:string,status:string,stock_level:string,price:string,date:string,search:string}): Promise<getProductsTypes> => {

  
  try {
    // console.log('status is stock level',status,stock_level);
    // console.log('token is',token);
    
    const response = await fetch(
    //   `${BASE_URL}/seller/${STORE_ID}/all-products?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
    `${BASE_URL}/seller/${STORE_ID}/all-products?page=${page}&limit=${limit}&status=${status}&stock_level=${stock_level}&date_from=${date.from}&date_to=${date.to}&search=${search}`,
    // `${BASE_URL}/seller/${STORE_ID}/all-products`,
      requestOptions
    );

    console.log(`${BASE_URL}/seller/${STORE_ID}/all-products?page=${page}&limit=${limit}&status=${status}&stock_level=${stock_level}&date_from=${date.from}&date_to=${date.to}`);
    // console.log('raw responce is',response);
    
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result: getProductsTypes = await response.json();
    console.log(result);
    
    return result;

  } catch (error) {
    console.error(error);
    throw error; 
  }

};


// import { getProductsTypes } from "@/types/product/products.types";

// export const fetchAllProducts = async ({
//   page = 1,
//   limit = 20,
//   sort = "createdAt",
//   order = "desc",
// }: {
//   page: number;
//   limit: number;
//   sort: string;
//   order: string;
// }): Promise<getProductsTypes> => {
//   const response = await fetch(
//     `/api/proxy/products?page=${page}&limit=${limit}&sort=${sort}&order=${order}`
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to fetch products: ${response.status}`);
//   }

//   return response.json();
// };
