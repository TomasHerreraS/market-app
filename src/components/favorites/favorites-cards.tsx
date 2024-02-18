import { Card, Col, Row, Image, Stack, Button } from "react-bootstrap";
import AddToCartButton from "../buttons/add-to-cart-button";
import DeleteButton from "../buttons/delete-button";
import "../../styles/favorites-cards.css";
import { Products } from "../../utils/type";
import OutOfStockButton from "../buttons/out-of-stock-button";

interface CardProps {
  product: Products;
  onDelete: (id: number) => void;
}

const FavoritesCards: React.FC<CardProps> = ({ product, onDelete }) => {
  return (
    <Card className="my-1 favorites-card">
      <Row className="g-0">
        <Col xs="auto">
          <Image className="favorites-img" src={product.images[0]} />
        </Col>
        <Col className="p-2 d-flex flex-column">
          <Stack direction="horizontal" className="justify-content-between">
            {product.inStock ? (
              <h6 className="in-stock-text">In stock</h6>
            ) : (
              <h6 className="out-of-stock-text">Out of stock</h6>
            )}
            <DeleteButton onDelete={() => onDelete(product.id)} />
          </Stack>
          <h3 className="product-name-text">{product.name}</h3>
          <h4 className="mt-auto">
            ${(product.price - product.discount).toFixed(2)}
          </h4>
          <Row
            direction="horizontal"
            className="justify-content-between align-items-end mt-auto"
          >
            <Col xs={4}>
            {product.discount > 0 ? (
              <Stack>
                <h6 className="price-off-text">${product.discount} OFF</h6>
                <h6 className="old-price-text">${product.price.toFixed(2)}</h6>
              </Stack>
            ) : (
              <h6></h6>
              )}
              </Col>
            <Col xs={8} className="d-flex justify-content-end">
            {product.inStock ? <AddToCartButton /> : <OutOfStockButton />}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default FavoritesCards;
