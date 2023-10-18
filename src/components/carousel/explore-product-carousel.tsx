import { Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import cardProducts from "./card-products";

const ProductCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="carousel-back">
    <h2>Explore Products</h2>
      <Carousel className="carousel-product" responsive={responsive}>
        {cardProducts.map((cardProducts) => (
          <Card key={cardProducts.id} className="carousel-product-card">
            <Card.Img src={cardProducts.image} />
            <h3>{cardProducts.name}</h3>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
