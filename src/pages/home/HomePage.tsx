import RecommendedProducts from "./components/RecommendedProducts";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Testimonial from "./components/Testimonial";
import FAQSection from "./components/FAQSection";

const HomePage = () => {
 
  return (
    <div>
      {/* <Hero /> */}
      <RecommendedProducts  />
      <Categories />
      <FeaturedProducts />
      <Testimonial />
      <FAQSection />
    </div>
  );
};

export default HomePage;
