import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/baseApi";
import Loading from "../../sharedComponents/Loading";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCartItem } from "../../redux/features/cartSlice";
import { toast } from "sonner";
import ImageMagnifier from "./components/ImageMagnifier";



const ProductDetails = () => {
    const {id} = useParams()
    const [quantity, setQuantity] = useState(1)
    const {data, isLoading} = useGetProductQuery(id)

    const dispatch = useAppDispatch()
    const allCartProducts = useAppSelector((state)=>state.cart.items)
    const isAddedProduct = allCartProducts?.find(item=>item._id===id)

    if (isLoading) {
        return <Loading />
    }
    const product = data?.data
    
    const handleQuantity = (value:boolean) =>{
        if (value) {
            quantity < product?.stockQuantity ? setQuantity(quantity+1) : ''
        }else{
            quantity > 1 ? setQuantity(quantity-1) : ''
        }
    }

    const handleAddToCart = () =>{
        if(!product.stockQuantity){
           return toast.error('Sorry Product not available')
        }
        if (!isAddedProduct) {
            dispatch(addToCartItem({...product,quantity}))
            toast.success('Product Add To Cart Success')
        }else{
            toast.error('Product Already Added !!! Please check your Cart ')
        }
    }

    return (

        <div className="grid lg:grid-cols-2 text-lg items-top">

           <figure className="flex justify-center w-full">
            <ImageMagnifier src={product?.img} />
           </figure>
           <div className=" border-l px-5">
            <h3 className="text-center text-4xl font-semibold mt-10">{product.name}</h3>
            <p className="py-3">{product?.description}</p>
            <div className="space-y-5">
                <h5 className="text-3xl font-semibold py-5 ">Price : ${product?.price}</h5> 
                <div className=" space-y-5">
                    <p>Status : <span className="text-xl font-semibold">{product?.stockQuantity ? 'Available' : 'Unavailable'}</span></p> 
                    <p>Stock : <span className="text-xl font-semibold">{product?.stockQuantity}</span></p> 
                </div>

                <div className="flex items-center gap-5">
                    <p >Quantity :</p>
                    <div className="flex ">
                        <p onClick={()=>handleQuantity(false)} className="border w-16 flex justify-center items-center h-16 "> <FaMinus /></p>
                        <p className="border w-16 flex justify-center items-center h-16 font-semibold">{quantity}</p>
                        <p onClick={()=>handleQuantity(true)} className="border w-16 flex justify-center items-center h-16 "><FaPlus /></p>
                    </div>
                </div>
               <p onClick={handleAddToCart} className="py-5 bg-green-300 text-center rounded font-semibold ">Add To Cart</p>
            </div>
           </div>
        </div>
    ); 
};

export default ProductDetails;