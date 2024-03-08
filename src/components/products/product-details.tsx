import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Products } from "../../utils/type";
import HeartButton from "../buttons/heart-button";
import "../../styles/carousel.css";
import "../../styles/product-cards.css";
import {
  Button,
  Card,
  CardBody,
  Carousel,
  CarouselItem,
  Col,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import AddToCartButton from "../buttons/add-to-cart-button";
import { getProductById } from "../../provider/product.provider";
import { TransformImage } from "../../utils/market-functions/transform-image";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Products>();

  useEffect(() => {
    getProductById(Number(id)).then((result) => {
      setProduct(result);
    });
  }, [id]);

  useEffect(() => {
    // Move PageTitle inside this useEffect to ensure that selectedProduct is updated
    if (product) {
      document.title = product.name + " | Quantum Halo";
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <Card className="mx-auto my-4 product-detail">
        <Carousel className="product-details-carousel">
          {product.image1 && (
            <CarouselItem className="slideshow-image">
              <Image
                width="100%"
                className="product-detail-img"
                src={TransformImage(product.image1)}
              />
            </CarouselItem>
          )}
          {product.image2 && (
            <CarouselItem className="slideshow-image">
              <Image
                width="100%"
                className="product-detail-img"
                src={TransformImage(product.image2)}
              />
            </CarouselItem>
          )}
          {product.image3 && (
            <CarouselItem className="slideshow-image">
              <Image
                width="100%"
                className="product-detail-img"
                src={TransformImage(product.image3)}
              />
            </CarouselItem>
          )}
        </Carousel>
        <CardBody>
          {product.quantity > 0 ? (
            <Card.Text className="in-stock">In Stock</Card.Text>
          ) : (
            <Card.Text className="out-of-stock">Out Of Stock</Card.Text>
          )}
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          {product.discount > 0 ? (
            <>
              <Card.Text className="card-price">
                ${(product.price - product.discount).toFixed(2)}
              </Card.Text>
              <Card.Text>
                <span className="original-price">${product.price}</span>
                <span className="savings">SAVE ${product.discount}</span>
              </Card.Text>
            </>
          ) : (
            <>
              <Card.Text>${product.price}</Card.Text>
            </>
          )}
          <Row className="align-items-end">
            <Col xs={4}>
              <Card.Text>Date released: {new Date(product.release_date).toDateString()}</Card.Text>
            </Col>
            <Col className="d-flex justify-content-end" xs={8}>
              <div className="d-flex gap-2">
                <HeartButton productId={product.product_id} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row className="detail-price d-flex g-0">
        <Col xs={4} md={2} className="my-auto d-flex justify-content-start">
          {product.quantity > 0 ? (
            <AddToCartButton />
          ) : (
            <Button variant="secondary">Out Of Stock</Button>
          )}
        </Col>
        <Col
          className="my-auto d-flex justify-content-end"
          xs={{ span: 6, offset: 2 }}
          md={{ span: 8, offset: 2 }}
        >
          <Stack direction="horizontal" gap={4}>
            <div>
              <h3 className="original-price">
                {product.discount > 0 ? `$${product.price}` : ""}
              </h3>
              <h3 className="savings">
                {product.discount > 0 ? `Saving: $${product.discount}` : ""}
              </h3>
            </div>
            <h3 className="bottom-price">
              ${(product.price - product.discount).toFixed(2)}
            </h3>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
