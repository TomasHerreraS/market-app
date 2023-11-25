import { Row, Col, Button } from "react-bootstrap";
import '../../styles/cart.css';

const Total = () => {
  return(
    <div className="div-total-style">
      <h6 className="total-title">Purchase summary</h6>
      <hr/>
      <Row className="mt-4 ps-3 pe-3 product-shipment-style">
        <Col md={{ span: 8, offset: 0}}>
          <p>Products (2)</p>
        </Col>
        <Col>
          <p>$40.000</p>
        </Col>
        <Col md={{ span: 8, offset: 0}}>
          <p>Shipment</p>
        </Col>
        <Col>
          <p className="shipment-color">Free</p>
        </Col>
      </Row>
      <Row className="ps-3 pe-3 total-price-style">
        <Col md={{ span: 8, offset: 0}}>
          <p>Total</p>
        </Col>
        <Col>
          <p>$500.000</p>
        </Col>
      </Row>
      <Row className="ps-5 mb-2">
        <Col md={{ span: 0, offset: 3}}>
          <Button>Go to pay</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Total;