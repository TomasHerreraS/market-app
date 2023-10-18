import Slideshow from "../components/carousel/main-carousel";
import NavigationBar from "../components/navigation-bar/navigation-bar";
import ProductCarousel from "../components/carousel/explore-product-carousel";
import ProductBox from "../components/product-box/product-box";

const MainPage = () => {
  return (
    <>
      <NavigationBar />
      <Slideshow />
      <ProductCarousel />
      <ProductBox />
    </> 
  );
};

export default MainPage;
