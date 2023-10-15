import Slideshow from "../components/carousel/main-carousel";
import ProductSlideshow from "../components/carousel/explore-product-carousel";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const MainPage = () => {
  return (
    <>
      <NavigationBar />
      <Slideshow />
      <ProductSlideshow/>
    </>
  );
};

export default MainPage;
