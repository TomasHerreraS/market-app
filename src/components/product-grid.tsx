import { Col, Row } from "react-bootstrap";
import ProductCards from "./product-cards";
import { products }  from "../components/products";

const ProductGrid: React.FC = () => {
  const selectedCategories = 'component';
  const filteredProducts = products.filter((product) => product.category === selectedCategories);

  return (
    <Row className="g-0">
      {filteredProducts.map((product) => (
        <Col key={product.id} sm={12} md={6} lg={4} className="p-3">
            <ProductCards
              key={product.id}
              product={product}
            />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;


