import { createSlice } from '@reduxjs/toolkit'

export type TProduct = {
  _id: string;
  category: string;
  description: string;
  img: string;
  name: string;
  price: number;
  ratings: number;
  stockQuantity: number;
};


type TProductsState = {
  products: TProduct[] | null;
  data: TProduct[] | null;
};
const initialState:TProductsState = {
  products:null,
  data:null,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts : (state, action)=>{
        const { products }= action.payload
        state.products = products
        state.data = products
    },
    filterProduct: (state, action) =>{
      if(action.payload==='All Product'){
        state.products = state.data
      }else{
        state.products = state.data?.filter(item=>item.category===action.payload) || null
      }
    },
    sortingProduct: (state, action) =>{
      if(action.payload==='High-Low'){
        state.products = state.products?.sort((a,b)=>a.price - b.price) || null
      }
      if(action.payload==='Low-High'){
        state.products = state.products?.sort((a,b)=>b.price - a.price) || null
      }
    },
    filterByPriceRange: (state, action) =>{
        state.products = state.data?.filter(item=>item.price>=action.payload.minPrice && item.price<=action.payload.maxPrice) || null
    },
    setFindByQueryData: (state, action) =>{
        state.products = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProducts, filterProduct, sortingProduct, filterByPriceRange, setFindByQueryData } = productsSlice.actions

export default productsSlice.reducer