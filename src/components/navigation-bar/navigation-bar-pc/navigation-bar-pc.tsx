import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import SignIn from "../../sign-in/sign-in";
import SignUp from "../../sign-up/sign-up";
import Peripherals from "./peripheral";
import Component from "./component";
import { FaSearch } from "react-icons/fa";
import ThemeToggleButton from "../../theme-button";
import { Fan } from "react-bootstrap-icons";
import { BsCart3 } from "react-icons/bs";
import exportedFunctions from "../../../utils/link";
import "../../../styles/navigation-bar-pc.css";

const NavigationBarPc = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const redirectToMainPage = exportedFunctions.useRedirectToMainPage();
  const redirectToCartPage = exportedFunctions.useRedirectToCart();

  const loggedIn: any = '1';
  return (
    <Row className="background-color text-color padding g-0 align-items-center">
      <Col md={1}>
      <Fan onClick={redirectToMainPage} className="cursor" size={40}/>
      </Col>
      <Col md={1}>
        <Peripherals />
      </Col>
      <Col md={2} className="text-center">
        <Component />
      </Col>
      <Col md={5}>
        <div className="div-input">
          <FaSearch className="search-icon" />
          <input
            className="input-style"
            placeholder="What are you looking for?"
          />
        </div>
      </Col>
      {loggedIn === '2' ?
        <>
          <Col md={1}>
            <h6
              className="cursor h6-margin"
              onClick={() => {
                setShowSignUp(true);
              }}
            >
              Sign up
            </h6>
            <SignUp show={showSignUp} setShow={setShowSignUp} />
          </Col>
          <Col md={1}>
            <h6
              className="h6-margin cursor"
              onClick={() => {
                setShowSignIn(true);
              }}
            >
              Sign in
            </h6>
            <SignIn show={showSignIn} setShow={setShowSignIn} />
          </Col>
        </>: 
        <Col className="align-end" md={{ span: 1, offset: 1}}>
          <div className="notification">
            <div className="notification-circle"></div>
            <span className="notification-count">
              1
            </span>
            <div className="icon-side-bar-pc">
              <BsCart3 className="align-end cursor" size={25} onClick={redirectToCartPage}/>
            </div>
          </div>
        </Col>
      }
      <Col className="text-center" md={1}>
        <ThemeToggleButton/>
      </Col>
    </Row>
  );
};

export default NavigationBarPc;
