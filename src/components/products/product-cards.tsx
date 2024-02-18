import { Card, Col, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import HeartButton from "../buttons/heart-button";
import { truncateText } from "../../utils/market-functions/truncate-text";
import "../../styles/product-cards.css";
import { Products } from "../../utils/type";
import { useState } from "react";
import AddToCartButton from "../buttons/add-to-cart-button";
import OutOfStockButton from "../buttons/out-of-stock-button";

interface CardProps {
  product: Products;
}

const ProductCards: React.FC<CardProps> = ({ product }) => {
  // For the Buttons to work correctly
  const [isHovered, setHovered] = useState(false);

  // Check if you're an admin user
  const [isAdmin, setAdmin] = useState(false);

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
      onClick={() => handleCardClick(product.id)}
      key={product.id}
      className="product-card"
    >
      <Card.Img variant="top" src={product.images[0]} className="card-images" />
      <Card.Body>
        <Card.Text className={product.inStock ? "in-stock" : "out-of-stock"}>
          {product.inStock ? "In Stock" : "Out Of Stock"}
        </Card.Text>
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
                <span className="original-price">
                  ${product.price.toFixed(2)}
                </span>{" "}
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
        <Row>
          <Col xs={8}>
            {product.inStock ? (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <AddToCartButton />
              </div>
            ) : 
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <OutOfStockButton />
              </div>
            }
          </Col>
          <Col xs={4} className="text-end">
            {isAdmin ? (
              // ADD THE DELETE BUTTON ONCE FUNCTION IS SETUP
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Trash />
              </div>
            ) : (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <HeartButton productId={product.id} />
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCards;
