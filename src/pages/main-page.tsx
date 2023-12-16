import { Button } from "react-bootstrap";
import ProductCarousel from "../components/carousel/explore-product-carousel";
import ProductBoxRow from "../components/product-box/product-box-row";
import Footer from "../components/footer/footer";
import Slideshow from "../components/carousel/main-carousel";
import "../styles/html.css";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const MainPage = () => {
  return (
    <>
      <NavigationBar />

      {/* Just to access them for now */}
      <Button href="/about-us">About Us</Button>
      <Button href="/favorites">Favorites</Button>
      <Button href="/products">Products</Button>

      <Slideshow />
      <ProductCarousel />
      <ProductBoxRow />
      <Footer />
    </>
  );
};

export default MainPage;
