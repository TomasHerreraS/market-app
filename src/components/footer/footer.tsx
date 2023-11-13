import { Col, Row } from "react-bootstrap";
import "../../styles/footer.css";
import SubscriptionForm from "../forms/subscription-form";

function Footer() {
  return (
    <Row className="g-0" >
      <Col sm={3} md={2} className="footer-sections">
        <h4>Shop</h4>
        <h6>New Products</h6>
        <h6>Special Offers</h6>
        <h6>Best Sellers</h6>
        <h6>Featured Products</h6>
      </Col>
      <Col sm={3} md={2} className="footer-sections">
        <h4>Explore</h4>
        <h6>PC Cases</h6>
        <h6>Peripherals</h6>
        <h6>Water Coolers</h6>
        <h6>Monitors</h6>
      </Col>
      <Col sm={3} md={2} className="footer-sections">
        <h4>Quantom Halo</h4>
        <h6>About</h6>
        <h6>Contact Us</h6>
        <h6></h6>
        <h6></h6>
        <h6></h6>
      </Col>
      <Col sm={3} md={2} className="footer-sections">
        <h4>Support</h4>
        <h6>Customer Support</h6>
        <h6>Warranty</h6>
        <h6>Shipping</h6>
      </Col>
      <Col sm={12} md={4} className="footer-sections">
        <h4>Subscribe</h4>
        <SubscriptionForm />
      </Col>
    </Row>
  );
}

export default Footer;
