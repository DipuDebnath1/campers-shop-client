import { Link } from "react-router-dom";
import banner from "../../../assets/banner.webp"
const Hero = () => {
    return (
        <div className="hero h-[80vh]"
            style={{ backgroundImage: `url(${banner})`,}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="">
                <h1 className="mb-5 text-3xl md:text-5xl font-bold">Explore the Outdoors with Confidence</h1>
                <p className="mb-5">
                Gear up for your next adventure with premium camping essentials designed for the great outdoors. Shop now and explore with confidence!
                </p>
                { <Link className=" mt-[1rem] text-lg font-semibold btn bg-green-500 hover:bg-[#00ad00] text-white hover:text-[#e0ffe0] border-none" to={'/products'}><span>Shop Now</span></Link>}
                </div>
            </div>
            </div>
    );
};

export default Hero;