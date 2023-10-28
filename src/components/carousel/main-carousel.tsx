import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import CarouselButton from "./carousel-buttons";
import firstImage from "../../assets/carousel-img/pc.webp";
import secondImage from "../../assets/carousel-img/pc5.webp";
import thirdImage from "../../assets/carousel-img/pc3.jpg";
import fourthImage from "../../assets/carousel-img/pc4.jpg";
import "../../styles/carousel.css";

function Slideshow() {
  return (
    <Carousel className="slideshow-image" fade>
      <Carousel.Item className="slideshow-image">
          <Image
            className="d-block w-100"
            src={firstImage}
            alt="First slide"
          />
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Shop Now" />
          <h3>Components</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slideshow-image">
          <Image
            className="w-100"
            src={secondImage}
            alt="Second slide"
          />
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Shop Now" />
          <h3>Monitors</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slideshow-image">
          <Image
            className="w-100"
            src={thirdImage}
            alt="Third slide"
          />
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Shop Now" />
          <h3>Peripherals</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slideshow-image">
          <Image
            className="w-100"
            src={fourthImage}
            alt="Third slide"
          />
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Learn More" />
          <h3>Unlock Your Potential</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;
