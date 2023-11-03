import Slideshow from "../components/carousel/main-carousel";
import ProductCarousel from "../components/carousel/explore-product-carousel";
import ProductBoxRow from "../components/product-box/product-box-row";
import Footer from "../components/footer/footer";
import "../styles/main-page.css";

const MainPage = () => {
  return (
    <>
      {/* <NavigationBar /> */}
      <Slideshow />
      <ProductCarousel />
      <ProductBoxRow />
      <Footer />
    </>
  );
};

export default MainPage;
