import Slideshow from "../components/carousel/main-carousel";
import ProductCarousel from "../components/carousel/explore-product-carousel";
import ProductBoxRow from "../components/product-box/product-box-row";


const MainPage = () => {
  return (
    <>
      {/* <NavigationBar /> */}
      <Slideshow />
      <ProductCarousel />
      <ProductBoxRow />
    </>
  );
};

export default MainPage;
