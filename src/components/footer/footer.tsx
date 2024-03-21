import { Col, Row } from "react-bootstrap";
import "../../styles/footer.css";
import SubscriptionForm from "../forms/subscription-form";

function Footer() {
  return (
    <Row className="g-0" >
      <Col sm={3} md={2} className="footer-sections">
        <h4>Shop</h4>
        <h6 className="footer-links-parent">
        <a href="/products?sort=Newest" className="footer-links">
          New Products
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="/products?" className="footer-links">
          Special Offers
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="/products?sort=Best_Sellers" className="footer-links">
          Best Sellers
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="/products?sort=Featured" className="footer-links">
          Featured Products
        </a>
          </h6>
      </Col>
      <Col sm={3} md={2} className="footer-sections">
        <h4>Explore</h4>
        <h6 className="footer-links-parent">
        <a href="/products?category=PC_Cases" className="footer-links">
          PC Cases
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="/products?category=Peripherals" className="footer-links">
          Peripherals
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="/products?search=water_coolers" className="footer-links">
          Water Coolers
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="/products?search=monitor" className="footer-links">
          Monitors
        </a>
          </h6>
      </Col>
      <Col sm={3} md={2} className="footer-sections">
        <h4>Quantom Halo</h4>
        <h6 className="footer-links-parent">
        <a href="/about-us" className="footer-links">
          About
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="#" className="footer-links">
          Contact Us
        </a>
          </h6>
      </Col>
      <Col sm={3} md={2} className="footer-sections">
        <h4>Support</h4>
        <h6 className="footer-links-parent">
        <a href="#" className="footer-links">
          Warranty
        </a>
          </h6>
        <h6 className="footer-links-parent">
        <a href="#" className="footer-links">
          Shipping
        </a>
          </h6>
      </Col>
      <Col sm={12} md={4} className="footer-sections">
        <h4>Subscribe</h4>
        <SubscriptionForm />
      </Col>
    </Row>
  );
}

export default Footer;
