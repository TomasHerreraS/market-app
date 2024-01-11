import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/api";
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

const ProductDetails = () => {
  const { id } = useParams();
  const idParam = id !== undefined ? +id : undefined;
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Could Not Fetch Products", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (idParam !== undefined) {
      const product = products.find((product) => product.id === idParam);
      setSelectedProduct(product);
    }
  }, [idParam, products]);

  useEffect(() => {
    // Move PageTitle inside this useEffect to ensure that selectedProduct is updated
    if (selectedProduct) {
      document.title = selectedProduct.name + " | Quantum Halo";
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Card className="mx-auto my-3 product-detail">
        <Carousel className="product-details-carousel">
          {Array.isArray(selectedProduct.images) ? (
            selectedProduct.images.map((image, index) => (
              <CarouselItem key={index} className="slideshow-image">
                <Image
                  width="100%"
                  className="product-detail-img"
                  src={image}
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <Image src={selectedProduct.images[0]} />
            </CarouselItem>
          )}
        </Carousel>
        <CardBody>
          {selectedProduct.inStock ? (
            <Card.Text className="in-stock">In Stock</Card.Text>
          ) : (
            <Card.Text className="out-of-stock">Out Of Stock</Card.Text>
          )}
          <Card.Title>{selectedProduct.name}</Card.Title>
          <Card.Text>{selectedProduct.description}</Card.Text>
          {selectedProduct.discount > 0 ? (
            <>
              <Card.Text className="card-price">
                ${(selectedProduct.price - selectedProduct.discount).toFixed(2)}
              </Card.Text>
              <Card.Text>
                <span className="original-price">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                <span className="savings">
                  SAVE ${selectedProduct.discount.toFixed(2)}
                </span>
              </Card.Text>
            </>
          ) : (
            <>
              <Card.Text>${selectedProduct.price}</Card.Text>
            </>
          )}
          <Row className="align-items-end">
            <Col xs={4}>
              <Card.Text>Date released: {selectedProduct.date}</Card.Text>
            </Col>
            <Col className="d-flex justify-content-end" xs={8}>
              <div className="d-flex gap-2">
                <HeartButton productId={selectedProduct.id} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row className="detail-price d-flex g-0">
        <Col xs={4} md={2} className="my-auto d-flex justify-content-start">
          {selectedProduct.inStock 
          ? <AddToCartButton />
          : <Button variant="secondary">Out Of Stock</Button>
          }
        </Col>
        <Col className="my-auto d-flex justify-content-end" xs={{span: 6,offset: 2}} md={{span: 8, offset: 2}}>
          <Stack direction="horizontal" gap={4}>
            <div>
          <h3 className="original-price">{selectedProduct.discount > 0 ? `$${selectedProduct.price}` : ""}</h3>
          <h3 className="savings">{selectedProduct.discount > 0 ? `Saving: $${selectedProduct.discount}` : ""}</h3>
            </div>
            <h3 className="bottom-price">${(selectedProduct.price - selectedProduct.discount).toFixed(2)}</h3>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
