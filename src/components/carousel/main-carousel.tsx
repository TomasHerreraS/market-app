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
        <div className="d-flex justify-content-center align-items-center">
          <Image
            className="d-block w-100"
            fluid
            src={firstImage}
            alt="First slide"
          />
        </div>
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Shop Now" />
          <h3>Components</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slideshow-image">
        <div className="d-flex justify-content-center align-items-center">
          <Image
            className="d-block w-100"
            fluid
            src={secondImage}
            alt="Second slide"
          />
        </div>
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Shop Now" />
          <h3>Monitors</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slideshow-image">
        <div className="d-flex justify-content-center align-items-center">
          <Image
            className="d-block w-100"
            fluid
            src={thirdImage}
            alt="Third slide"
          />
        </div>
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Shop Now" />
          <h3>Peripherals</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slideshow-image">
        <div className="d-flex justify-content-center align-items-center">
          <Image
            className="d-block w-100"
            fluid
            src={fourthImage}
            alt="Third slide"
          />
        </div>
        <Carousel.Caption className="slideshow-text">
          <CarouselButton buttonText="Learn More" />
          <h3>Unlock Your Potential</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;
