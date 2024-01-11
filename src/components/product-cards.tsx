import { Button, Card, Col, Row } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import HeartButton from "./buttons/heart-button";
import { Product } from "./products";
import { truncateText } from "../utils/truncate-text";
import "../styles/product-cards.css";

interface CardProps {
  product: Product;
}

// Create a onClick function to redirect to the productURL
const handleCardClick = (productUrl: any) => {
  console.log({ productUrl });
};

const ProductCards: React.FC<CardProps> = ({ product }) => {
  return (
    <Card
      onClick={() => handleCardClick(product.id)}
      key={product.id}
      className="product-card"
    >
      <Card.Img variant="top" src={product.image} className="card-images" />
      <Card.Body>
        <Card.Title className="card-title">{product.name}</Card.Title>
        <Card.Text className="card-description">
          {truncateText(product.description, 105)}
        </Card.Text>
        <div className="space">
          {product.discount > 0 ? (
            <>
              <Card.Text className="card-price space-between">
                ${(product.price - product.discount).toFixed(2)}
              </Card.Text>
              <Card.Text className="space-between">
                <span className="discount">${product.price.toFixed(2)}</span>{" "}
                <span className="savings">
                  SAVE ${product.discount.toFixed(2)}
                </span>
              </Card.Text>
            </>
          ) : (
            <Card.Text className="card-price">
              ${product.price.toFixed(2)}
            </Card.Text>
          )}
        </div>
        <Row className="justify-content-between align-items-bottom">
          <Col xs={8}>
            <Button variant="info">
              <Cart size={20} className="product-icon" />
              &nbsp;Add To Cart
            </Button>
          </Col>
          <Col xs={4} className="text-end">
            <HeartButton productId={product.id} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCards;
