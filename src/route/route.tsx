import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import About from "../pages/about/About";
import ProductManagement from "../pages/product-management/ProductManagement";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/product-details/ProductDetails";
import Cart from "../pages/cart/Cart";
import CheckOut from "../checkout/CheckOut";
import OrderSuccess from "../pages/oderSuccess/OrderSuccess";
import CreateProduct from "../pages/createProduct/CreateProduct";
import UpdateProduct from "../pages/updateProduct/UpdateProduct";

export const router = createBrowserRouter([
    {
      path:'/',
      element:<App />,
      children:[
        {
          index:true,
          element:<HomePage />
        },
        {
          path:'about',
          element:<About />
        },
        {
          path:'products',
          element:<Products />
        },
        {
          path:'products/:id',
          element:<ProductDetails />
        },
        {
          path:'product-management',
          element:<ProductManagement />
        },
        {
          path:'cart',
          element:<Cart />
        },
        {
          path:'checkout',
          element:<CheckOut />
        },
        {
          path:'order-success',
          element:<OrderSuccess />
        },
        {
          path:'create-product',
          element:<CreateProduct />
        },
        {
          path:'update-product/:id',
          element:<UpdateProduct />
        },
    ]
    }
  ]);