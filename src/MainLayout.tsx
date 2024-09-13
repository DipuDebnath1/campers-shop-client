import { Outlet, useLocation} from "react-router-dom";
import Navbar from "./sharedComponents/Navbar";
import Footer from "./sharedComponents/Footer";
import Hero from "./pages/home/components/Hero";
import Loading from "./sharedComponents/Loading";
import { useGetProductsQuery } from "./redux/api/baseApi";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setProducts } from "./redux/features/productSlice";
import { Toaster } from "sonner";

const MainLayout = () => {
    const param  = useLocation()
    const dispatch = useAppDispatch()

    const  {data,  isLoading} = useGetProductsQuery(undefined )
    useEffect(() => {
        if (data) {
          dispatch(setProducts({ products: data.data }));
        }
      }, [data, dispatch]);

    if (isLoading) {
      return (
        <Loading />
      );
    }
  


    return (
        <div>
         <Navbar />
         <Toaster position="top-center" duration={1000} />
         { param.pathname==='/' && <Hero /> }
         <div className="max-w-7xl mx-auto ">
            <Outlet />
         </div>
         <Footer />
        </div>
    );
};

export default MainLayout;