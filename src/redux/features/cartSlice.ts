import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCartItem = {
    _id: string;
    category: string;
    description: string;
    img: string;
    name: string;
    price: number;
    ratings: number;
    stockQuantity: number;
    quantity: number;
  };

  type CartState = {
    items : TCartItem[] | null,
    total: number
  }

  const initialState : CartState ={
    items : [],
    total:0
  }

export const cartSlice = createSlice({
    name:'cart',
    initialState,
     reducers:{
        addToCartItem:(state, action:PayloadAction<TCartItem>)=>{
            const isExist = state.items?.find(item=> item._id == action.payload._id)
            if(!isExist){
                const totalPrice = action.payload.price*action.payload.quantity
                state.total+=totalPrice
                state.items?.push({...action.payload})
            }
        },
        removeCartItem:(state, action:PayloadAction<string>)=>{
 
            if (state.items && action.payload) {
                const product = state.items?.find(item=> item._id == action.payload)
                const removeProductPrice = product!.price * product!.quantity
                state.total -= removeProductPrice
                state.items = state.items?.filter(item=> item._id !== action.payload)
            }
        },
        increaseProductQuantity : (state, action:PayloadAction<string>)=>{

            const product = state.items!.find(item => item._id === action.payload);
            if (product && product.quantity < product.stockQuantity) {
                product.quantity += 1;
                state.total += product.price
            }
        },
        decreaseProductQuantity : (state, action:PayloadAction<string>)=>{
            const product = state.items?.find(item=>item._id == action.payload)
            if (product && state.items && product.quantity > 1) {
                product.quantity-=1
                state.total -= product.price
            }
        },
        clearCart : (state)=>{
            state.items=[]
            state.total=0
        }
     }
})

export const {addToCartItem, removeCartItem, increaseProductQuantity, decreaseProductQuantity, clearCart} = cartSlice.actions
export default cartSlice.reducer