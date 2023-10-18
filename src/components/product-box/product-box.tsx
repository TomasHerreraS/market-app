import { Col, Container, Row } from "react-bootstrap";
import "../../styles/product-box.css";

function ProductBox() {
  return (
    <Container className="align-items-center w-100">
      <Row className="product-box-row">
        <Col sm={6} md={6} lg={6}>
          <Container className="product-box-container"></Container>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Container className="product-box-container"></Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductBox;
