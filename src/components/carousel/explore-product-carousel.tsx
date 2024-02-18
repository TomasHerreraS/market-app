import { Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import cardProducts from "./explore-products";

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
    <div className="m-3 carousel-back">
      <div  className="explore-products-title">
    <h2 className="p-0 product-title">Explore Products</h2>
      </div>
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
