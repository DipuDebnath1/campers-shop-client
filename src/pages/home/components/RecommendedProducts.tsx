/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../../../componets/SectionTitle";
import { useAppSelector } from "../../../redux/hooks";
import { TProduct } from "../../../redux/features/productSlice";

const RecommendedProducts = () => {
    const products = useAppSelector((state)=>state.products.products)

    return (
        <div className="mt-[4rem] mx-5">
            <SectionTitle title={'Recommended Products'} button={'View More'}  />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {
                products?.slice(0,4)?.map((item:TProduct,i:number)=><div key={i} className="bg-[#4242420b] p-4 rounded relative group">
                    <p className="absolute left-4 rounded font-semibold p-1 bg-white px-1 text-[10px]">{item.stockQuantity ?<span className="text-green-600 "> Available</span> : <span className="text-red-600 "> Unavailable</span>  }</p>
                    <Link to={`products/${item._id}`}>
                    <p className="absolute right-4 rounded font-semibold p-1 text-green-500 text-xl hidden group-hover:block transition"><FaShoppingCart /></p>
                        <img className="w-full object-cover h-44" src={item.img} alt={item.name} />
                        <div className="flex justify-between items-center">
                        <h3 className="py-3 text-xl font-semibold">{item.name}</h3>
                        <strong>${item.price}</strong>
                        </div>
                    </Link>
            </div>)
        }
        </div>
        </div>
    );
};

export default RecommendedProducts;