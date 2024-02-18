import { useState } from "react";
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Stack,
} from "react-bootstrap";
import SignIn from "../../sign-in/sign-in";
import SignUp from "../../sign-up/sign-up";
import Peripherals from "./peripheral";
import Component from "./component";
import { FaSearch } from "react-icons/fa";
import ThemeToggleButton from "../../buttons/theme-button";
import { Fan, PersonFill } from "react-bootstrap-icons";
import { BsCart3 } from "react-icons/bs";
import exportedFunctions from "../../../utils/link";
import "../../../styles/navigation-bar-pc.css";

const NavigationBarPc = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const redirectToMainPage = exportedFunctions.useRedirectToMainPage();
  const redirectToCartPage = exportedFunctions.useRedirectToCart();

  const loggedIn: string = "2";
  return (
    <Row className="background-color text-color padding g-0 align-items-center justify-content-between">
      <Col md="auto">
        <Fan onClick={redirectToMainPage} className="cursor" size={40} />
      </Col>
      <Col md="auto">
        <Stack direction="horizontal" gap={4}>
          <Peripherals />
          <Component />
          <Component />
        </Stack>
      </Col>
      <Col md={4}>
        <InputGroup>
          <Button size="sm" variant="info">
            <FaSearch size={20} />
          </Button>
          <FormControl placeholder="Search for a product" className="navbar-search-input"/>
        </InputGroup>
      </Col>
      {loggedIn === "1" ? (
        <Col md="auto" className="d-flex justify-content-end">
            <div className="d-flex justify-content-end" style={{width: "180px"}}>
            <Stack direction="horizontal" gap={4}>
              <h6
                className="cursor h6-margin"
                onClick={() => {
                  setShowSignUp(true);
                }}
                >
                Sign up
              </h6>
              <SignUp show={showSignUp} setShow={setShowSignUp} />
              <h6
                className="h6-margin cursor"
                onClick={() => {
                  setShowSignIn(true);
                }}
              >
                Sign in
              </h6>
              <SignIn show={showSignIn} setShow={setShowSignIn} />
                <ThemeToggleButton />
            </Stack>
                </div>
          </Col>
      ) : (
        <Col md="auto" className="d-flex justify-content-end">
          <div className="d-flex justify-content-end" style={{width: "180px"}}>
          <Stack direction="horizontal" gap={4} className="align-items-end">
            <div>
              <ThemeToggleButton />
            </div>
            <div className="notification">
              <div className="notification-circle"></div>
              <span className="notification-count">1</span>
              <div className="icon-side-bar-pc">
                <BsCart3
                  className="cursor"
                  size={23}
                  onClick={redirectToCartPage}
                  />
              </div>
            </div>
            <div>
              <PersonFill size={23} />
            </div>
          </Stack>
                  </div>
        </Col>
      )}
    </Row>
  );
};

export default NavigationBarPc;
