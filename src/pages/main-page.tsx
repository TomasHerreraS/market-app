import { Button } from "react-bootstrap";
import ProductCarousel from "../components/carousel/explore-product-carousel";
import ProductBoxRow from "../components/product-box/product-box-row";
import Footer from "../components/footer/footer";
import Slideshow from "../components/carousel/main-carousel";
import NavigationBar from "../components/navigation-bar/navigation-bar";
import "../styles/html.css"

const MainPage = () => {
  return (
    <>
      <NavigationBar />

      {/* Just to access favorites for now */}
      <Button href="/favorites" >Favorites</Button> 

      <Slideshow />
      <ProductCarousel />
      <ProductBoxRow />
      <Footer />
    </>
  );
};

export default MainPage;
