// 'use server'
import axios from 'axios';
import { BASE_URL, STORE_ID, TOKEN } from '@/config/api';
// import { cookies } from "next/headers";
import { getToken } from '@/utils/cookie';
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

import { allCategoryType, delCatResTypes } from '@/types/category/allcategory.types';
import { Category } from '@/types/category/allcategory.types';
import { Category_ } from '@/types/category/cat_update.types';
import { CategoryPayload } from '@/types/category/allcategory.types';
import { getCatByIdTypes } from '@/types/category/allcategory.types';
import { addCatResTypes } from '@/types/category/allcategory.types';

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
    return response.data.data || [];

  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch categories';
    console.error('getAllCategory error:', message);
    throw new Error(message);
  }
};

const addcategorie = async (data: CategoryPayload): Promise<addCatResTypes | undefined> => {
  try {
    // const userCookies = await cookies();
    // const token = userCookies.get('token');
    const token = getToken();
    const res = await axios.post<addCatResTypes>(
      `${BASE_URL}/seller/cmicq2mup0005q6lfjz98h2yd/create-category`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('from add cat', res.data);

    return res.data;

  } catch (error) {


    // throw error;
    return undefined;
  }
};

export default addcategorie;




export const getCategoryById = async (categoryId: string): Promise<getCatByIdTypes | undefined> => {
  try {

    const url = `${BASE_URL}/seller/${STORE_ID}/get-categoryById?id=${categoryId}`;
    const token = await getToken();
    console.log(categoryId, token);


    const response = await axios.get<getCatByIdTypes>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('data is', response.data.data);
    alert('...');
    return response.data;

  } catch (error: any) {

    const msg = error.response?.data?.message || error.message || 'Failed to fetch category';
    console.error('getCategoryById error:', msg);
    alert('error')
    return undefined;
  }
};

export const updateCategory = async (
  id:string,
  category: Category_
) => {
  try {
    const token = await getToken();

    const res = await axios.patch(
      `${BASE_URL}/seller/${STORE_ID}/update-category?id=${id}`,
      category,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log('from update category.......', res.data);

    return res.data;

  } catch (error) {
      
    throw error;
  }
};

export const deleteCategory = async (id: string):Promise<delCatResTypes | undefined> => {

  try {

    const token = await getToken();

    const res = await axios.delete<delCatResTypes>(
      `${BASE_URL}/seller/${STORE_ID}/delete-category?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data;
  } catch (error) {
    alert('something went wrong...');
    return;

  }

}