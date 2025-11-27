import axios from 'axios';
import { BASE_URL ,STORE_ID,TOKEN} from '@/config/api';

// export function getGlobalCategory(node, list) {
//   if (!node) return;                    
//   if (typeof node.name === 'string') {  
//     list.push(node.name);
//   }

//   // Make sure children is always an array before iterating
//   const children = Array.isArray(node.children) ? node.children : [];
//   for (const child of children) {
//     getGlobalCategory(child, list);
//   }
// }

// // Usage for your response:
// const myarr1 = [];
// for (let i = 0; i < responce.data.length; i++) {
//   myarr1[i] = [];
//   getGlobalCategory(responce.data[i], myarr1[i]);   
// }
// console.log(myarr1);


 // const myarr = [[], []];
  // for (let i = 0; i < responce.data.length; i++) {
    // console.log(i);
    // let parent = responce.data[i] as any;
    // let hasChild = true;
    // let child = parent.children;
    // while(hasChild) {
    //   // console.log("while child",child,parent);
    //   if(child[0].children.length > 0) {
    //     console.log("Found the child",child[0].name);
    //     child = child[0].children;
    //   } else {
    //     console.log(`${child[0].name} has no child`);
    //     hasChild = false;
    //     exit;
    //   }
    // }


    // let str = `responce.data[${i}].children`;
    // let obj = responce.data[i].children;

    // console.log(str);
    // // myarr[i].push(obj[i].name);
    // while (obj && obj.length > 0) {
    //   // console.log('my sol is',str.name);

    //   // console.log("Child",str.children[0].name);
    //   console.log("Child", obj[0].name);
    //   myarr[i].push(obj[0].name);
    //   str += '.children';
    //   obj = obj[0].children;
    //   console.log(str);
    //   console.log(obj);
    // }
    // str = '';

    //   // str = str + `.children[0]`;
    // }
  // }

  
// const axios = require('axios');
// services/category/globalcategory.service.ts

import {allCategoryType} from '@/types/category/allcategory.types';
import { Category } from '@/types/category/allcategory.types'; 
import { CategoryPayload } from '@/types/category/allcategory.types';


export const getAllCategory = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<allCategoryType>(
      `${BASE_URL}/${STORE_ID}/all-categories`,
      {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return only the data part (array of root categories)
    return response.data || [];

  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch categories';
    console.error('getAllCategory error:', message);
    throw new Error(message); // This will be caught in your store/component
  }
};

const addcategorie = async (data:CategoryPayload) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/seller/cmicq2mup0005q6lfjz98h2yd/create-category`,
      data,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtaWN6dDZyMjAwMGpyeDAxYXJ6M2JhaDAiLCJyb2xlIjoiY21pYmM3bGN1MDAwMHE2djJucXdnZ3l1eCIsImVtYWlsIjoidmludXNnb3lhbmlAZ21haWwuY29tIiwic3RvcmVfaWQiOiJjbWljcTJtdXAwMDA1cTZsZmp6OThoMnlkIiwiZXhwIjoxNzY0MTM0NDM4fQ.Y1dYvKOV7bPSJ_khUoOvaRURGRDJ17nNmn2PqDbCVRw`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log('from add cat',res);
    
    return res.data;
    
} catch (error) {
      
    // throw error;
    return error;
  }
};

export default addcategorie;



const getToken = () => {
  return localStorage.getItem('access_token') || 
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtaWN6dDZyMjAwMGpyeDAxYXJ6M2JhaDAiLCJyb2xlIjoiY21pYmM3bGN1MDAwMHE2djJucXdnZ3l1eCIsImVtYWlsIjoidmludXNnb3lhbmlAZ21haWwuY29tIiwic3RvcmVfaWQiOiJjbWljcTJtdXAwMDA1cTZsZmp6OThoMnlkIiwiZXhwIjoxNzY0MTM0NDM4fQ.Y1dYvKOV7bPSJ_khUoOvaRURGRDJ17nNmn2PqDbCVRw';
};

export const getCategoryById = async (categoryId: string):Promise<Category> => {
  try {
    const url = `${BASE_URL}/seller/${STORE_ID}/get-categoryById?id=${categoryId}`;

    const response = await axios.get<Category>(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || 'Failed to fetch category';
    console.error('getCategoryById error:', msg);
    throw new Error(msg);
  }
};

export const updateCategory = async (
  storeId: string,
  slug: string,
  category: Category
) => {
    try {
        const res = await axios.patch(
          `${BASE_URL}/seller/${storeId}/update-category?id=${slug}`,
          category,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${TOKEN}`,
            }
          }
        );
        console.log('from update category.......',res.data);
        return res.data;
    } catch (error) {
       throw error;
    }
};
