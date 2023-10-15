import Carousel from "react-bootstrap/Carousel";
import { Col, Image, Row } from "react-bootstrap";
import firstImage from "../../assets/carousel-img/monitor-product.png";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// Move this somewhere else to change data easier
const arrayOfProducts = [
  { id: 1, name: "Object 1", description: "Description for Object 1", image: firstImage },
  { id: 2, name: "Object 2", description: "Description for Object 2", image: firstImage },
  { id: 3, name: "Object 3", description: "Description for Object 3", image: firstImage },
];

// This will be to display a few products below the main carousel
function ProductSlideshow() {
  return (
    <>
      <div className="carousel-product-back">
        <h2>Find Products</h2>
        <Carousel className="carousel-product" interval={null}>
          <Carousel.Item>
            <div className="align-items-center">
              <Row>
                <Col lg={3} md={4} xs={12}>
                  <Image className="carousel-products-img" src={firstImage} />
                </Col>
                <Col lg={3} md={4} xs={12}>
                  <Image className="carousel-products-img" src={firstImage} />
                </Col>
                <Col lg={3} md={4} xs={12}>
                  <Image className="carousel-products-img" src={firstImage} />
                </Col>
                <Col lg={3} md={4} xs={12}>
                  <Image className="carousel-products-img" src={firstImage} />
                </Col>
              </Row>
            </div>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default ProductSlideshow;
