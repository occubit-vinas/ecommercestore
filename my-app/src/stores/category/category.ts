import { create } from 'zustand';
// import { getAllCategory } from '@/servicies/category/globalcategory.service';
import { responce } from '../data';
import { getCategoryById } from '@/servicies/category/category.service';
import { CategoryStore } from '@/types/category/allcategory.types';
export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    loading: false,
    error: null,
    responce: responce,
    categorie: [],
    fetchcategories: async () => {
        try {
            set({ loading: true, error: null });
            function getGlobalCategory(node, list) {
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
            console.log('from zustand', categories);

        } catch (error: any) {
            set({
                error: error.message || 'failed to load category',
                loading: false,
            });
        }
    },
    fetchCategorieById: async (id: string) => {

        try {
            set({ loading: true })
            const res = await getCategoryById(id);
            set({
                categorie: res,
            })
            return res;
        } catch (error: any) {
            set({
                error: error.message || 'failed to get category detail',
                loading: false,
            })
        }
    }
}));

