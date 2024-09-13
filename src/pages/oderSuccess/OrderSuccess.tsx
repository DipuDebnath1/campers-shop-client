import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="bg-gray-50 flex flex-col justify-center items-center p-10 space-y-2">
                 <FaCheckCircle className="text-5xl text-green-500" />
                 <p className="text-3xl">Thank You</p>
                 <p className="text-xl">Your Order Confirmed Success!</p>
                 <p className="text-lg">We wil send Order Confirmation mail. As soon as your Order Shipped.</p>
                 <Link to={'/'} className="text-lg bg-green-500 text-white py-2 px-4 rounded">Go Home</Link>
            </div>
        </div>
    );
};

export default OrderSuccess;