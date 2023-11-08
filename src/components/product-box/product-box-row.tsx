import { Col, Image, Row } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import topLeftImage from "../../assets/explore-products-img/product-box-gaming-setup.jpg";
import topRightImage from "../../assets/explore-products-img/product-box-mouse.jpg";
import row2TopLeftImage from "../../assets/explore-products-img/product-box-gpu.jpg";
import row2BottomLeftImage from "../../assets/explore-products-img/product-box-keyboard.jpg";
import boottomRightImage from "../../assets/explore-products-img/product-box-row2-right.jpg";
import "../../styles/product-box.css";

function ProductBoxRow() {
  return (
    <>
      <Row className="g-0">
        <Col sm={6} md={6}>
          <div className="product-box-top-left">
            <a href="#">
              <div className="product-box-image-text top-row-image-text">
                <h2>Hello</h2>
                <h3>
                  Shop Now
                  <ChevronRight />
                </h3>
              </div>
              <div className="vignette">
                <Image className="top-row-img" src={topLeftImage} />
              </div>
            </a>
          </div>
        </Col>
        <Col sm={6} md={6}>
          <div className="product-box-top-right">
            <a href="#">
              <div className="product-box-image-text top-row-image-text">
                <h2>Hello</h2>
                <h3>
                  Shop Now
                  <ChevronRight />
                </h3>
              </div>
              <div className="vignette">
                <Image className="top-row-img" src={topRightImage} />
              </div>
            </a>
          </div>
        </Col>
      </Row>
      <Row className="g-0">
        <Col sm={6} md={6}>
          <div className="row2-top-left">
            <a href="#">
              <div className="product-box-image-text row2-left-image-text">
                <h2>Hello</h2>
                <h3>
                  Shop Now
                  <ChevronRight />
                </h3>
              </div>
              <div className="vignette">
                <Image className="row2-img-left" src={row2TopLeftImage} />
              </div>
            </a>
          </div>
          <div className="row2-bottom-left">
            <a href="#">
              <div className="product-box-image-text row2-left-image-text">
                <h2>Hello</h2>
                <h3>
                  Shop Now
                  <ChevronRight />
                </h3>
              </div>
              <div className="vignette">
                <Image className="row2-img-left" src={row2BottomLeftImage} />
              </div>
            </a>
          </div>
        </Col>
        <Col sm={6} md={6}>
          <div className="product-box-right">
            <a href="#">
              <div className="product-box-image-text row2-right-image-text">
                <h2>Hello</h2>
                <h3>
                  Shop Now
                  <ChevronRight />
                </h3>
              </div>
              <div className="vignette">
                <Image
                  className="row2-img-right"
                  src={boottomRightImage}
                  alt="abc"
                />
              </div>
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProductBoxRow;
