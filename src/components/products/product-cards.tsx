import { Card, Col, Row } from "react-bootstrap";
import HeartButton from "../buttons/heart-button";
import { truncateText } from "../../utils/market-functions/truncate-text";
import "../../styles/product-cards.css";
import { Products } from "../../utils/type";
import { useState } from "react";
import AddToCartButton from "../buttons/add-to-cart-button";
import OutOfStockButton from "../buttons/out-of-stock-button";
import { TransformImage } from "../../utils/market-functions/transform-image";

interface CardProps {
  obj: Products;
}

const ProductCards: React.FC<CardProps> = ({ obj }) => {
  // For the Buttons to work correctly
  const [isHovered, setHovered] = useState(false);

  // Create a onClick function to redirect to the productURL
  const handleCardClick = (productUrl: number) => {
    if (!isHovered) {
      window.location.href = "products/" + productUrl;
    }
  };
  // Handle the mouse hover over buttons
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Card
      onClick={() => handleCardClick(obj.product_id)}
      key={obj.product_id}
      className="product-card"
    >
      <Card.Img
        variant="top"
        src={TransformImage(obj.image1)}
        className="card-images"
      />
      <Card.Body>
        <Card.Text className={obj.quantity > 0 ? "in-stock" : "out-of-stock"}>
          {obj.quantity > 0 ? "In Stock" : "Out Of Stock"}
        </Card.Text>
        <Card.Title className="card-title">{obj.name}</Card.Title>
        <Card.Text className="card-description">
          {truncateText(obj.description, 60)}
        </Card.Text>
        <div className="space">
          {obj.discount > 0 ? (
            <>
              <Card.Text className="card-price space-between">
                ${(obj.price - obj.discount).toFixed(2)}
              </Card.Text>
              <Card.Text className="space-between">
                <span className="original-price">${obj.price}</span>{" "}
                <span className="savings">SAVE ${obj.discount}</span>
              </Card.Text>
            </>
          ) : (
            <Card.Text className="card-price">${obj.price}</Card.Text>
          )}
        </div>
        <Row>
          <Col xs={8}>
            {1 > 0 ? (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <AddToCartButton />
              </div>
            ) : (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <OutOfStockButton />
              </div>
            )}
          </Col>
          <Col xs={4} className="text-end">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HeartButton productId={obj.product_id} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCards;
