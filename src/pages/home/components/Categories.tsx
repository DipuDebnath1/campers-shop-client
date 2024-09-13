import { GiCampingTent, GiChelseaBoot, GiFirstAidKit, GiLanternFlame, GiLightBackpack } from "react-icons/gi";
import { PiKnife } from "react-icons/pi";
import SectionTitle from "../../../componets/SectionTitle";

const data = [
    {
        icon:<GiLightBackpack />,
        name:'Camping Bag'
    },
    {
        icon:<GiCampingTent />,
        name:'Camping Tent'
    },
    {
        icon:<GiLanternFlame />,
        name:'Lantern'
    },
    {
        icon:<GiChelseaBoot />,
        name:'Hiking Boot'
    },
    {
        icon:<GiFirstAidKit />,
        name:'First Aid'
    },
    {
        icon:<PiKnife />,
        name:'Tools'
    },
]
const Categories = ()  => {
    
    return (
        <div className="mt-[4rem] px-5">
        <SectionTitle title='Products Category' />
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">
            {
                data?.map((item,i:number)=><div key={i} className="flex flex-col justify-center bg-[#f2f2f2] py-4 rounded">
                        <span className="text-3xl md:text-5xl mx-auto">{item.icon}</span>
                        <h4 className="text-center text-sm lg:text-lg">{item.name}</h4>
            </div>)
        }
        </div>
        </div>

    );
};

export default Categories;