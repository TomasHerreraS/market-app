import ProductCarousel from "../components/carousel/explore-product-carousel";
import ProductBoxRow from "../components/product-box/product-box-row";
import Footer from "../components/footer/footer";
import Slideshow from "../components/carousel/main-carousel";
import "../styles/html.css";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const MainPage = () => {
  document.title = "Home | Quantum Halo"
  return (
    <>
      <NavigationBar />
      <Slideshow />
      <ProductCarousel />
      <ProductBoxRow />
      <Footer />
    </>
  );
};

export default MainPage;
