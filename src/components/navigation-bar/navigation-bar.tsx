import { Row, Col, NavDropdown } from "react-bootstrap";
import '../../styles/navigation-bar.css';

const NavigationBar = () => {
  return (
    <Row className="background-color text-color padding">
      <Col md={1}>
          <NavDropdown
            id="nav-dropdown-dark-example"
            className='ms-2'
            title='Categories'>
            <NavDropdown.Item
              href="">
              Components
            </NavDropdown.Item>
            <NavDropdown.Item
              href="">
              Peripheral
            </NavDropdown.Item>
          </NavDropdown>
      </Col>
      <Col md={3}>
        <input type="text" placeholder="What are you looking for?" size={40}/>
      </Col>
      <Col md={{ span: 1, offset: 5}}>
        <a className="text-decoration" href="/sign-up">Sign up</a>
      </Col>
      <Col>
        <h6 className="sign-in-margin">
          Sign in
        </h6>
      </Col>
    </Row>
  )
}

export default NavigationBar;