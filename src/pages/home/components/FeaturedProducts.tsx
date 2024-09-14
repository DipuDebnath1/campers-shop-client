import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../../../componets/SectionTitle";
import { useAppSelector } from "../../../redux/hooks";
import { TProduct } from "../../../redux/features/productSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeaturedProducts = () => {

    const products = useAppSelector((state)=>state.products.products)
    return (
    
        <div className="mt-[4rem] px-5">
            <SectionTitle title={'Featured Products'}  />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
            {
                products?.slice(0,4)?.map((item:TProduct,i:number)=><div key={i} className="bg-[#4242420b] p-4 rounded relative group">
                    <p className="absolute left-4 rounded font-semibold p-1 bg-white px-1 text-[10px]">{item.stockQuantity ? <span className="text-green-600 bg-white px-1 rounded text-[10px]"> Available</span> : <span className="text-red-600 "> Unavailable</span> }</p>
                    <p className="absolute right-4 rounded font-semibold p-1 text-green-500 text-xl hidden group-hover:block transition"><FaShoppingCart /></p>
                        <img className="w-full object-cover" src={item.img} alt={item.name} />
                        <div className="flex justify-between items-center">
                        <h3 className="py-3 text-xl font-semibold">{item.name}</h3>
                        <strong>${item.price}</strong>
                        </div>
                        <div className="flex"><Link className="text-sg font-semibold border-none  bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded" to={`products/${item._id}`}>View Details</Link></div>

            </div>)
        }
        </div>
        </div>
    );
};

export default FeaturedProducts;