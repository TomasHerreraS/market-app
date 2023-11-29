import { Row, Col } from "react-bootstrap"
import Product from "./product"
import Total from "./total";

const Cart = () => {
  return (
    <Row className="g-0">
      <Col md={8}>
        <Product/>
      </Col>
      <Col md={4}>
        <Total/>
      </Col>
    </Row>
  )
}

export default Cart;