/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProduct } from "../features/productSlice";

type TResponse = {
    statusCode: number,
    success: boolean,
    message: string,
    data:TProduct
}

export const baseApi = createApi({
    reducerPath:'baseApi',
    baseQuery:fetchBaseQuery({baseUrl:"https://campers-shop-server-ks2qowwpn-dipudebnath966gmailcoms-projects.vercel.app/api"}),
    tagTypes:['Product'],
    endpoints:(builder)=>({
        // find all product
        getProducts:builder.query({
            query:()=>({
                url:'/products',
                method:'GET'
            }),
            providesTags:['Product']
        }),
        // find single product
        getProduct:builder.query({
            query:(id)=>({
                url:`/products/${id}`,
                method:'GET'
            }),
            providesTags:['Product']
        }),
        // searchProduct
        searchProduct:builder.query({
            query:(data)=>({
                url:`/products/search?text=${data}`,
                method:'GET',
            }),
            providesTags:['Product']
        }),
        // create single product
        productCreate:builder.mutation<TResponse, any>({
            query:(data)=>({
                url:`/products`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Product']
        }),
        // update single product
        updateSingleProduct:builder.mutation<TResponse, any>({
            query:({id,...data})=>({
                url:`/products/${id}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Product']
        }),
        // update Many product
        updateManyProducts:builder.mutation<TResponse, any>({
            query:(data)=>({
                url:`/products/bulk-update`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Product']
        }),
        // delete single product
        deleteSingleProduct:builder.mutation<TResponse, any>({
            query:(id)=>({
                url:`/products/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Product']
        }),
    })
})

export const {useGetProductsQuery, useGetProductQuery, useProductCreateMutation, useUpdateSingleProductMutation, useDeleteSingleProductMutation, useUpdateManyProductsMutation, useSearchProductQuery
} = baseApi