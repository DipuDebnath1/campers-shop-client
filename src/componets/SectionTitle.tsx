import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SectionTitle = ({title, button}:any) => {
    return (
        <div className="flex justify-between items-center">
            <h3 className="text-xl sm:text-2xl lg:text-4xl text-center font-semibold py-6
             text-[#424242]">{title}</h3>
           {button && <Link className=" mt-[1rem] text-sm md:text-lg font-semibold btn bg-[#00ad00] hover:bg-[#00ad00] text-white hover:text-[#e0ffe0] border-none" to={'/products'}><span>{button}</span></Link>}
        </div>
    );
};

export default SectionTitle;