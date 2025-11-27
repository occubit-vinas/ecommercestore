"use client"
import { exit } from "process";
import { useEffect } from "react";
import axios from "../../node_modules/axios/index";
import { responce } from '../stores/data';
import { useCategoryStore } from "@/stores/category/category";
import { getAllCategory } from "@/servicies/category/category.service";
export default function Home() {
  const {categories,error,loading,fetchcategories} =useCategoryStore();
  
  useEffect(()=>{
    // fetchcategories();
    const func1=async()=>{

      await fetchcategories();
      console.log('final res is...',categories,error,loading);      
    }
    func1();
  },[])
  
  return (
    <div className="">
      
    </div>
  );
}
