import { Button } from "react-bootstrap";
import ProductCarousel from "../components/carousel/explore-product-carousel";
import ProductBoxRow from "../components/product-box/product-box-row";
import Footer from "../components/footer/footer";
import Slideshow from "../components/carousel/main-carousel";
import "../styles/html.css"
import ProductGrid from "../components/product-grid";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const MainPage = () => {
  return (
    <>
      <NavigationBar/>
      {/* <Button href="/about-us" >About Us</Button>  */}
      <ProductGrid />
      <Slideshow />
      <ProductCarousel />
      <ProductBoxRow />
      <Footer />
    </>
  );
};

export default MainPage;
