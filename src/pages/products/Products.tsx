import { FaShoppingCart } from "react-icons/fa";
import SectionTitle from "../../componets/SectionTitle";
import Loading from "../../sharedComponents/Loading";
import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { TProduct } from "../../redux/features/productSlice";

const Products = () => {
    const [productPriceSort, setProductPriceSort]=useState('')
    const [productsCategory, setProductsCategory]=useState('All Product')

    const products = useAppSelector(state=>state.products.products)
  
    if (!products) {
      return (
        <Loading />
      );
    }
    return (
        <div>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div>
                {/* drawer button */}
                <label htmlFor="my-drawer" className=" drawer-button lg:hidden"><span className=" mt-[1rem] text-lg font-semibold btn bg-[#00ad00] hover:bg-[#00ad00] text-white hover:text-[#e0ffe0] border-none ml-5" ><span>Filter By</span></span></label>
                </div>

                {/* main content  */}
                <div className="flex">
                    {/* sidebar large Device */}
                    <div className="hidden lg:block lg:w-[25%] border-r-2">
                        <Sidebar setProductPriceSort={setProductPriceSort} productPriceSort={productPriceSort} productsCategory={productsCategory} setProductsCategory={setProductsCategory} />
                    </div>
                    {/* product  */}
                    <div className="lg:w-[75%] px-5"> 
                        <div>
                        <SectionTitle title={'Products'} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pl-5">
                        {
                            products?.map((item:TProduct,i:number)=><div key={i} className="bg-[#4242420b] p-4 rounded relative group">
                               <p className="absolute left-4 rounded font-semibold p-1 text-sm">{item.stockQuantity ? <span className="text-green-600 "> Available</span> : <span className="text-red-600 "> Unavailable</span> }</p>
                                <Link to={`/products/${item._id}`}>
                                <p className="absolute right-4 rounded font-semibold p-1 text-green-500 text-xl hidden group-hover:block transition"><FaShoppingCart /></p>
                                        <img className="w-full object-cover" src={item.img} alt={item.name} />
                                    </Link>
                                    <div className="flex justify-between items-center">
                                    <h3 className="py-3 text-xl font-semibold">{item.name}</h3>
                                    <strong>${item.price}</strong>
                                    </div>
                                    <div className="flex"><Link className="text-sg font-semibold border-none  bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded" to={`/products/${item._id}`}>View Details</Link></div>
                            </div>)
                        }
                    </div>
                    </div></div>
                </div>
            </div>

            {/* drawer sidebar small device*/}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay bg-white"></label>
                <div className="bg-white p-5 min-h-screen">
                 <Sidebar setProductPriceSort={setProductPriceSort} productPriceSort={productPriceSort} productsCategory={productsCategory} setProductsCategory={setProductsCategory} />
                </div>
            </div>
            </div>
        </div>
    );
};

export default Products;