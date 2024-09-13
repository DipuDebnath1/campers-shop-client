/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { filterByPriceRange, filterProduct, setFindByQueryData, sortingProduct } from "../../../redux/features/productSlice";
import { useSearchProductQuery } from "../../../redux/api/baseApi";

const Sidebar = ({ setProductPriceSort, productPriceSort, productsCategory, setProductsCategory }:any) => {

    const [maxPrice, setMaxPrice]=useState(1000)
    const [minPrice, setMinPrice]=useState(20)
    const [searchQuery, setSearchQuery]=useState('')
    // setSearchQuery
    const {data} = useSearchProductQuery(searchQuery)
    const dispatch = useAppDispatch()

    const products = useAppSelector(state=>state.products.data)

    const [allCategory, setAllCategory] = useState<string[]>([])

    useEffect(()=>{
        const productsCategory = products?.reduce((acc, item) => {
            acc[item.category] = item.category; 
            return acc;
        }, {} as Record<string, string>); 
        
        if(productsCategory){
            const result = Object.keys(productsCategory)
            setAllCategory(result)
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

        
    const handleFilterCategory = (value:any) => {
        setProductsCategory(value)
        dispatch(filterProduct(value))
    }
    const handleSortingProduct = (value:any) => {
        setProductPriceSort(value)
        dispatch(sortingProduct(value))
    }

    const handleFilterByPriceRange = ( type:string, value:number) => {
       if(type==='minPrice'){
        setMinPrice(value)
       }
       if(type==='maxPrice'){
        setMaxPrice(value)
       }

       dispatch(filterByPriceRange({minPrice, maxPrice}))
    }


    const handleSearchProduct = async(e : string) =>{
        setSearchQuery(e)
        dispatch(setFindByQueryData(data.data))
    }

    return (
        <div className="pr-5 px-5">
             <div className="flex items-center justify-between"> 
                {/* drawer button */}
                <h1 className="text-xl mt-[2rem] font-semibold">Product Filter</h1>
                <label htmlFor="my-drawer" className=" drawer-button lg:hidden"><span className=" mt-[1rem] text-2xl font-semibold border-none" ><MdClose /></span></label>
            </div>
            <div className="py-5">
                <label className="input input-bordered flex items-center gap-2">
                <input onChange={(e)=>handleSearchProduct(e.target.value)} type="text" className="grow" placeholder="Search" />
                <svg
                   
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
                </label>
            </div>
            {/* by price  */}
            <div>
                <h2 className="text-lg font-semibold">By Price</h2>
                <div>
                   <div className="flex gap-2 items-center">
                    <label htmlFor="low">Min</label>
                    <input className="text-green-300" type="range" min={20} max={500} onChange={(e)=>handleFilterByPriceRange('minPrice',Number(e.target.value))} defaultValue={minPrice} id="low" />
                    <span>{minPrice}</span>
                   </div>

                   <div className="flex gap-2 items-center">
                    <label htmlFor="high">Max</label>
                    <input onChange={(e)=>handleFilterByPriceRange('maxPrice',Number(e.target.value))} name="max" type="range" min={500} max={1000}  defaultValue={maxPrice} id="high" />
                    <span>{maxPrice}</span>
                   </div>
                
                </div>
                <div className="flex gap-5 pb-5">
                    <div className={`flex items-center p-1 px-2 justify-center mt-5 rounded border hover:bg-green-400 transition  ${productPriceSort==='Low-High' && 'bg-green-400 text-white' }`}>
                    <p onClick={()=>handleSortingProduct('Low-High')} className={`text-lg`}>Low-High</p>
                    </div> 
                    <div className={`flex items-center p-1 px-2 justify-center mt-5 rounded border hover:bg-green-400 transition ${productPriceSort==='High-Low' && 'bg-green-400 text-white' }`}>
                    <p onClick={()=>handleSortingProduct('High-Low')} className="text-lg">High-Low</p>
                    </div>
                </div>
            </div>
            {/* By Category */}
           <div>
           <h2 className="text-lg font-semibold pb-3">By Category</h2>
            <div className="grid grid-cols-2 gap-5 justify-start">
            {
                allCategory?.map((item,i:number)=><div onClick={()=>handleFilterCategory(item)} key={i}  className={`flex items-center p-1 justify-center rounded border gap-2 hover:bg-green-300 transition ${productsCategory===item && 'bg-green-400 text-white'}`}>
                    <p className="text-lg">{item}</p>
            </div>)
        }
        </div>
        <div onClick={()=>handleFilterCategory('All Product')} className={`flex items-center p-1 justify-center mt-5 rounded border hover:bg-green-300 transition ${productsCategory==='All Product' && 'bg-green-400 text-white'}`}>
         <p className="text-lg">All Product</p>
        </div>

           </div>
        </div>
    );
};

export default Sidebar;