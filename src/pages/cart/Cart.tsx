/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { decreaseProductQuantity, increaseProductQuantity, removeCartItem,  } from "../../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import { useEffect } from "react";

const Cart = () => {

    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const total = useAppSelector(state=>state.cart.total)
  

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseProductQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseProductQuantity(id));
  };

  const handleRemoveItem = (id: string) => {
    // if (window.confirm('Are you sure you want to remove this item from your cart?')) {
        dispatch(removeCartItem(id));
    // }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'hello warn'; // Required for showing the confirmation dialog in most browsers
    };

    // Add the event listener for page unload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cartItems]); // No dependencies, this will run once when the component mounts
 

    return  (
        <div className="container mx-auto p-8">
          <h2 className="md:text-3xl text-xl font-bold mb-4">Your Cart</h2>
    
          {!cartItems  || cartItems!.length === 0 ? (
            <div className="h-[40vh] flex gap-4 items-center justify-center flex-col">
              <BsCartXFill className="text-5xl" />
              <p className="text-3xl"> Your cart is empty !!!</p>
            </div>
          ) : (
            <>
              {/* Cart Items Table */}
              <table className="table-auto w-full text-left mb-8">
                <thead>
                  <tr>
                    <th className="md:px-4 px-2 py-2">Product</th>
                    <th className="md:px-4 px-2 py-2">Stock</th>
                    <th className="md:px-4 px-2 py-2">Quantity</th>
                    <th className="md:px-4 px-2 py-2">Price</th>
                    <th className="md:px-4 px-2 py-2">Total</th>
                    <th className="md:px-4 px-2 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems!.map(item => (
                    <tr key={item._id} className="shadow">
                      <td className="md:px-4 px-2 py-2 flex flex-col items-center">
                        <img src={item.img} alt={item.name} className="w-16 h-16 mr-4" />
                        <div>{item.name}</div>
                      </td>
                      <td className="md:px-4 px-2 py-2 "><p>{item.stockQuantity}</p></td>
                      <td className="md:px-4 px-2 py-2 ">
                      <div className='flex '>
                      <button
                          className="p-1 text-white bg-red-500"
                          onClick={() => handleDecreaseQuantity(item._id)}
                          disabled={item.quantity === 1}
                        >
                          
                          <FaMinus  />
                        </button>
                        <div className="bg-gray-200">
                              <span className="mx-2 ">{item.quantity}</span>
                          </div>
                        <button
                          className="p-1 text-white bg-green-400"
                          onClick={() => handleIncreaseQuantity(item._id)}
                          disabled={item.quantity >= item.stockQuantity}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      </td>
                      <td className="md:px-4 px-2 py-2">${item.price.toFixed(2)}</td>
                      <td className="md:px-4 px-2 py-2">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="md:px-4 px-2 py-2">
                        <button
                          className="btn btn-error btn-sm text-white"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    
              {/* Pricing Details */}
              <div className="mb-8">
                <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
              </div>
    
              {/* Place Order Button */}
              <Link to="/checkout">
                <button
                  className={`btn w-full bg-green-400 border-none text-white hover:bg-green-500  ${
                    cartItems!.some(item => item.stockQuantity === 0) ? 'btn-disabled' : ''
                  }`}
                  disabled={cartItems!.some(item => item.stockQuantity === 0)}
                >
                  Place Order
                </button>
              </Link>
            </>
          )}
        </div>
      );
};

export default Cart;