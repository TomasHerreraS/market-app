import { Card, Col, Row, Image, Stack } from "react-bootstrap";
import AddToCartButton from "../buttons/add-to-cart-button";
import DeleteButton from "../buttons/delete-button";
import "../../styles/favorites-cards.css";
import { Products } from "../../utils/type";
import OutOfStockButton from "../buttons/out-of-stock-button";
import { TransformImage } from "../../utils/market-functions/transform-image";

interface CardProps {
  obj: Products;
  onDelete: (id: number) => void;
}


const FavoritesCards: React.FC<CardProps> = ({ obj, onDelete }) => {
  return (
    <Card className="my-1 favorites-card">
      <Row className="g-0">
        <Col xs="auto">
          <Image className="favorites-img" src={TransformImage(obj.image1)} />
        </Col>
        <Col className="p-2 d-flex flex-column">
          <Stack direction="horizontal" className="justify-content-between">
            {obj.quantity > 0 ? (
              <h6 className="in-stock-text">In stock</h6>
            ) : (
              <h6 className="out-of-stock-text">Out of stock</h6>
            )}
            <DeleteButton onDelete={() => onDelete(obj.product_id)} />
          </Stack>
          <h3 className="product-name-text">{obj.name}</h3>
          <h4 className="mt-auto">
            ${(obj.price - obj.discount)}
          </h4>
          <Row
            direction="horizontal"
            className="justify-content-between align-items-end mt-auto"
          >
            <Col xs={4}>
            {obj.discount > 0 && (
              <Stack>
                <h6 className="price-off-text">${obj.discount} OFF</h6>
                <h6 className="old-price-text">${obj.price}</h6>
              </Stack>
            )}
              </Col>
            <Col xs={8} className="d-flex justify-content-end">
            {obj.quantity > 0 ? <AddToCartButton /> : <OutOfStockButton />}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default FavoritesCards;
