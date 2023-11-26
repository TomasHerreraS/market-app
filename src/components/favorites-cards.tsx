import { Card, Col, Row, Image, Stack } from "react-bootstrap";
import AddToCartButton from "./add-to-cart-button";
import DeleteButton from "./delete-button";
import "../styles/favorites-cards.css";
import { Product } from './products';

interface CardProps {
  product: Product;
  onDelete: (id: number) => void;
}




const FavoritesCards: React.FC<CardProps> = ({ product, onDelete }) => {
  return (
    <Card className="my-1 favorites-card">
      <Row className="g-0">
        <Col xs="auto">
          <Image className="favorites-img" src={product.image} />
        </Col>
        <Col className="p-2 d-flex flex-column">
          <Stack
            direction="horizontal"
            className="justify-content-between"
          >
            {product.inStock ? (
              <h6 className="in-stock-text">
                In stock
              </h6>
            ) : (
              <h6 className="out-of-stock-text">
                Out of stock
              </h6>
            )}
            <DeleteButton onDelete={() => onDelete(product.id)}/>
          </Stack>
          <h3 className="product-name-text">{product.name}</h3>
          <h4 className="mt-auto">
            ${(product.price - product.discount).toFixed(2)}
          </h4>
          <Stack
            direction="horizontal"
            className="justify-content-between align-items-end mt-auto"
          >
            {product.discount > 0 ? (
              <Stack>
              <h6 className="price-off-text">${product.discount} OFF</h6>
              <h6 className="old-price-text" >${product.price.toFixed(2)}</h6>
              </Stack>
            ) : (
              <h6 style={{ visibility: "hidden" }}>${product.price}</h6>
            )}
            <AddToCartButton />
          </Stack>
        </Col>
      </Row>
    </Card>
  );
};

export default FavoritesCards;
