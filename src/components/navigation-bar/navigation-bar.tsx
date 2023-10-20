import React, {useState} from 'react'
import { Row, Col, NavDropdown } from "react-bootstrap";
import SignIn from '../sign-in/sign-in';
import '../../styles/navigation-bar.css';
import SignUp from '../sign-up/sign-up';

const NavigationBar = () => {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

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
        <h6
          className='cursor-pointer sign-in-margin'
          onClick={()=>{
            setShowSignUp(true);
          }}>
          Sign up
        </h6>
        <SignUp show={showSignUp} setShow={setShowSignUp} />
      </Col>
      <Col md={1}>
        <h6
          className='cursor-pointer sign-in-margin'
          onClick={()=>{
            setShowSignIn(true);
          }}>
          Sign in
        </h6>
        <SignIn show={showSignIn} setShow={setShowSignIn}/>
      </Col>
    </Row>
  )
}

export default NavigationBar;