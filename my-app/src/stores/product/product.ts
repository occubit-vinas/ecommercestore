import { create } from 'zustand';
import { fetchAllProducts } from '@/servicies/product/product.servicies';
import { ProductStore } from '@/types/product/products.types';
export const useProductStore = create<ProductStore>((set,get) => ({

    filters: {
        categorie: "",
        stock_level: "",
        status: "",
        date: {
            from:'',
            to: '',
        },
        price: "",
        page:1,
        sort:'',
        order:'',
        limit:15,  
    },

    search:'',

    pagination: {
        page: 1,
        limit: 5,
        pages: 1,
        total: 0,
    },

    loading:false,
    allProducts:[],
    message:'',
    success:'',

    setFilter: (key, value) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [key]: value,
        },
    })),

    setSearch:(value)=>
        set({
        search:value,
    }),

    setPagination: (key, value) =>
        set((state) => ({
        pagination: {
        ...state.pagination,
        [key]: value,
        ...(key !== "page" && { page: 1 }),
        },
  })),


    resetFilters: () =>
        set({
            filters: {
                categorie: "",
                stock_level: "",
                status: '',
                date: {from: '',to:''},
                price: "",
                page:1,
                sort:'',
                order:'',
                limit:7,
                search:'',
            },
        }),

    handleFetchProduct: async () => {
        set({loading:true});
        const {page,sort,order,status,stock_level,price,limit,date} = get().filters;
        const search=get().search;
        console.log('status is..',status);
        console.log('filters is',get().filters);
        
        const data = await fetchAllProducts({page,sort,order,status,stock_level,price,limit,date,search});

        set({
            allProducts:data.data,
            loading:false,
            message:data.message,
            success:data.success,
            pagination:{
                page:data.data.pagination.page,
                limit:data.data.pagination.limit,
                pages:data.data.pagination.pages,
                total:data.data.pagination.total,
            }
        })
    }
}))

