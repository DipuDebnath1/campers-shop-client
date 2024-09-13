// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import SectionTitle from '../../../componets/SectionTitle';
const Testimonial = () => {
    const clientReviews = [
        {
          clientName: "John Doe",
          img: "https://i.ibb.co.com/FD31Q4r/user.jpg",
          description: "This was an amazing product! It exceeded my expectations in every way. The quality is outstanding, and the customer service was very responsive. Highly recommended for anyone looking for quality."
        },
        {
          clientName: "Jane Smith",
          img: "https://i.ibb.co.com/TLNKqt4/images.jpg",
          description: "I had a fantastic experience with this product. It arrived on time, and the quality was just as advertised. I’ll definitely be buying more in the future and recommending it to my friends."
        },
        {
          clientName: "Alex Johnson",
          img: "https://i.ibb.co.com/3Tm67Zz/images.jpg",
          description: "The product works well, but I had a few issues with shipping delays. However, customer support was prompt and helpful in resolving everything. Overall, I’m still happy with the purchase."
        },
        {
          clientName: "Emily Davis",
          img: "https://i.ibb.co.com/tCp6Hsn/images.jpg",
          description: "I absolutely love this product! The design is both beautiful and practical, and it has made my outdoor adventures much more enjoyable. I’ll definitely purchase more items from this shop."
        },
        {
          clientName: "Michael Brown",
          img: "https://i.ibb.co.com/TLNKqt4/images.jpg",
          description: "This product is decent for the price, though I expected it to be more durable. It serves its purpose, but I’m not sure if it will last long-term. Still, it’s an affordable option for those on a budget."
        }
      ];
      
    return (
        <div className='mt-[5rem] px-5'>
            <SectionTitle title={'Testimonial'}  />
             <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={true}
                  modules={[EffectCoverflow, Pagination]}
                  className="mySwiper md:max-h-[15rem]"
                >
        {
            clientReviews.map((client,i)=>  <SwiperSlide key={i} className=''>
            <div className='flex gap-10 flex-col md:flex-row items-center'>
              <div className='md:w-[30%]'> 
                  <img src={client.img} />
              </div>
              <div className='md:w-[60%]'>
                  <h3 className='text-2xl font-semibold'>{client.clientName}</h3>
                    <ul className='flex text-orange-600 mt-3 gap-1'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    </ul>
                  <p className='text-lg mt-3'>{client.description}</p>
              </div>
            </div>
          </SwiperSlide>)
        }
             </Swiper>
        </div>
    );
};

export default Testimonial;