import { Col, Row } from "react-bootstrap";
import ProductCards from "./product-cards";
import Products from "../components/products";

const ProductGrid = () => {
  return (
    <Row className="g-0">
      {Products.map((product) => (
        <Col key={product.id} sm={12} md={6} lg={4} className="p-3">
            <ProductCards
              name={product.name}
              id={product.id}
              description={product.description}
              image={product.image}
              price={product.price}
              discount={product.discount}
            />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;


