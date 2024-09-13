import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useUpdateManyProductsMutation } from "../redux/api/baseApi";
import { toast } from "sonner";
import { clearCart } from "../redux/features/cartSlice";

const CheckOut = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const products = useAppSelector((state) => state.cart.items);
    const totalPrice = useAppSelector((state) => state.cart.total);
    const dispatch = useAppDispatch()

    const [updateManyProducts] = useUpdateManyProductsMutation()
    const navigate = useNavigate();

    console.log(products);
    
  
    const handlePlaceOrder = async() => {
      const res =await updateManyProducts(products)
      console.log(res);
      
      if (res.data?.success) {
        toast.success(res?.data.message)
        dispatch(clearCart(undefined))
        navigate('/order-success');
      }
    };


    return (
        <div className="container mx-auto p-8">
          <h2 className="text-3xl font-bold mb-6">Checkout</h2>
    
          <form className="grid grid-cols-1 gap-6 mb-6">
            {/* User Details Form */}
            <div>
              <label className="block text-lg font-medium">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
    
            <div>
              <label className="block text-lg font-medium">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
    
            <div>
              <label className="block text-lg font-medium">Phone</label>
              <input
                type="tel"
                className="input input-bordered w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
    
            <div>
              <label className="block text-lg font-medium">Delivery Address</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
    
            {/* Payment Method */}
            <div>
              <label className="block text-lg font-medium">Payment Method</label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Cash on Delivery</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio checked:bg-blue-500"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                </label>
              </div>
            </div>
          </form>
    
          {/* Pricing Summary */}
          <div className="border-t pt-6">
            <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
            <p className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
    
          {/* Place Order Button */}
          {
            !totalPrice ?  <button
            className="btn btn-primary w-full mt-6"
            disabled > Place Order
          </button> :
           <button
           className="btn btn-primary w-full mt-6"
           onClick={handlePlaceOrder}
           disabled={!name || !email || !phone || !address}
         > Place Order </button>
          }
         
        </div>
      );
};

export default CheckOut;