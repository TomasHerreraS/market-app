import { useState } from "react";
import { Row, Col, InputGroup, Button, FormControl, Stack } from "react-bootstrap";
import SignIn from "../../sign-in/sign-in";
import SignUp from "../../sign-up/sign-up";
import Component from "./component";
import { FaSearch } from "react-icons/fa";
import ThemeToggleButton from "../../buttons/theme-button";
import { Fan, PersonFill } from "react-bootstrap-icons";
import { BsCart3 } from "react-icons/bs";
import exportRedirect from "../../../utils/link";
import "../../../styles/navigation-bar-pc.css";
import MailValidation from "../../sign-up/modal-mail-validation";
import { Role } from "../../../utils/type";

const NavigationBarPc: React.FC<Role> = ({ role }) => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const redirectToMainPage = exportRedirect.useRedirectToMainPage();
  const redirectToCartPage = exportRedirect.useRedirectToCart();

  const handleSearch = () => {
    if (search) {
      const url = "/products?search=" + search.replace(" ", "_");
      window.location.href = url;
    } else {
      window.location.href = "/products";
    }
  };

  const handleOnChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Row className="background-color text-color padding g-0 align-items-center justify-content-between">
      <Col md="auto" className="d-flex align-items-center">
        <div className="navbar-links">
          <Fan onClick={redirectToMainPage} className="cursor" size={40} />
        </div>
        <div className="navbar-links">
          <Component />
        </div>
        {role !== 0 && 
        <a href="/favorites" className="navbar-links">Favorites</a>
        }
        <a href="/about-us" className="navbar-links">About Us</a>
      </Col>
      <Col md={4}>
        <InputGroup>
          <Button size="sm" variant="info" onClick={handleSearch}>
            <FaSearch size={20} />
          </Button>
          <FormControl
            placeholder="Search for a product"
            className="navbar-search-input"
            value={search}
            onChange={handleOnChange}
            onKeyDown={handleKeyPress}
          />
        </InputGroup>
      </Col>
      {role === 0 ? (
        <Col md="auto" className="d-flex justify-content-end">
          <div
            className="d-flex justify-content-end"
            style={{ width: "180px" }}
          >
            <Stack direction="horizontal" gap={4}>
              <h6
                className="cursor h6-margin"
                onClick={() => {
                  setShowSignUp(true);
                }}
              >
                Sign up
              </h6>
              <SignUp
                show={showSignUp}
                setShow={setShowSignUp}
                setShowValidation={setShowValidation}
              />
              <MailValidation
                show={showValidation}
                setShow={setShowValidation}
              />
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
          <div
            className="d-flex justify-content-end"
            style={{ width: "180px" }}
          >
            <Stack direction="horizontal" gap={4} className="align-items-end">
              <div>
                <ThemeToggleButton />
              </div>
              <div className="notification">
                <div className="notification-circle"></div>
                <span className="notification-count">1</span>
                <div className="icon-side-bar-pc">
                  <BsCart3
                    className="cursor icon-buttons"
                    size={23}
                    onClick={redirectToCartPage}
                  />
                </div>
              </div>
              <div>
                <PersonFill size={23} className="cursor icon-buttons" />
              </div>
            </Stack>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default NavigationBarPc;
