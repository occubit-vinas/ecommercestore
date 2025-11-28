import { create } from 'zustand';
// import { getAllCategory } from '@/servicies/category/globalcategory.service';
import { responce } from '../data';
import  { deleteCategory, getCategoryById, updateCategory } from '@/servicies/category/category.service';
import { CategoryPayload, CategoryStore } from '@/types/category/allcategory.types';
import addcategorie from '@/servicies/category/category.service';
import { Category_ } from '@/types/category/cat_update.types';

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    loading: false,
    error: null,
    // responce: responce,
    categorie: null,
    fetchcategories: async () => {
        try {
            set({ loading: true, error: null });
            function getGlobalCategory(node:any, list:any) {
                if (!node) return;
                if (typeof node.name === 'string') {
                    // list.push(node.name);
                    // list.push([node.name,node.isActive,node.createdAt])
                    list.push({ id:node.id,name: node.name, isActive: node.isActive, creratedAt: node.createdAt });
                }

                // Make sure children is always an array before iterating
                const children = Array.isArray(node.children) ? node.children : [];
                for (const child of children) {
                    getGlobalCategory(child, list);
                }
            }

            // Usage for your response:
            const myarr1 = [];
            for (let i = 0; i < responce.data.length; i++) {
                myarr1[i] = [];
                getGlobalCategory(responce.data[i], myarr1[i]);
            }
            set({
                categories: myarr1,
                loading: false,
            })
            

        } catch (error: any) {
            set({
                error: error.message || 'failed to load category',
                loading: false,
            });
        }
    },
    fetchCategorieById: async (id: string) => {

        
        set({ loading: true })
        const res = await getCategoryById(id);
        
        // const res_=res?.data;
        
        set({
            categorie: res?.data,
            loading:false,
        })
    
    },
    createCategory:async(data:CategoryPayload)=>{
        
        set({loading:true})
         
         const res = await addcategorie(data);

         if(res?.success){
            alert('category added succesfully');
         }else{
            alert('something went wrong');
         }   

        set({loading:false});
    },
    handleDelCategory:async(id:string)=>{
        set({loading:true});

        const res = await deleteCategory(id);

        if(res?.success){
             alert('category deleted succesfully');

        }else{
            alert('something went wrong to delete category');
        }
        set({loading:false});
    },
    handleUpdateCategory:async(id:string,category:Category_)=>{
        set({loading:true});

        const res = await updateCategory(id,category);

        
        if(res?.success){
             alert('category updated succesfully');

        }else{
            alert('something went wrong to update category');
        }
        set({loading:false});
    }
}));

