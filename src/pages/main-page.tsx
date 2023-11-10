// import { Carousel } from "react-bootstrap";
import CarouselFadeExample from "../components/carousel/carousel";
import Slideshow from "../components/carousel/carousel";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const MainPage = () => {
  return (
    <>
      {/* <NavigationBar /> */}
      <Button href="/about-us" >About Us</Button> 
      <Slideshow />
      <ProductCarousel />
      <ProductBoxRow />
      <Footer />
    </>
  );
};

export default MainPage;
