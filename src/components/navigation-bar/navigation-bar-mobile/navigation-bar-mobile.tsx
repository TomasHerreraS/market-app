import { useState } from "react";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SignIn from "../../sign-in/sign-in";
import SignUp from "../../sign-up/sign-up";
import { FaSearch } from "react-icons/fa";
import ThemeToggleButton from "../../buttons/theme-button";
import { Fan } from "react-bootstrap-icons";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { BsCart3 } from "react-icons/bs";
import { SidebarData } from "./sidebar-data";
import { Link } from "react-router-dom";
import exportedFunctions from "../../../utils/link";
import "../../../styles/navigation-bar-mobile.css";

const NavigationBarMobile = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState(false);
  const redirectToMainPage = exportedFunctions.useRedirectToMainPage();

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Row className="background-color text-color padding g-0 align-items-center">
      {!showInput ? (
        <>
          <Col xs={4} md={4}>
            <IconContext.Provider value={{ color: "#fff" }}>
              <div className="icon-side-bar">
                <Link to="#">
                  <FaIcons.FaBars onClick={showSidebar} size={30} />
                </Link>
              </div>
              <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                  <Row>
                    <Col>
                      <li className="navbar-toggle">
                        <div className="menu-bars">
                          <BsCart3 size={30} />
                        </div>
                      </li>
                    </Col>
                    <Col>
                      <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                          <AiIcons.AiOutlineClose />
                        </Link>
                      </li>
                    </Col>
                  </Row>
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        {!item.path &&
                        (item.title === "Sign in" ||
                          item.title === "Sign up") ? (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <a
                            className="no-link"
                            onClick={() => {
                              if (item.title === "Sign in") {
                                setShowSignIn(true);
                              } else if (item.title === "Sign up") {
                                setShowSignUp(true);
                              }
                            }}
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.path && (
                            <Link to={item.path}>
                              <span>{item.title}</span>
                            </Link>
                          )
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <SignUp show={showSignUp} setShow={setShowSignUp} />
              <SignIn show={showSignIn} setShow={setShowSignIn} />
            </IconContext.Provider>
          </Col>
          <Col xs={2} md={2} className="text-center">
            <Fan onClick={redirectToMainPage} className="cursor" size={30} />
          </Col>
          <Col xs={2} md={2} className="text-center">
            <ThemeToggleButton />
          </Col>
          <Col xs={4} md={4} className="align-end">
            <FaSearch
              className="me-1 cursor search"
              size={20}
              onClick={() => {
                setShowInput(true);
              }}
            />
          </Col>
        </>
      ) : (
        <>
          <Col xs={11} md={11} className="col-input">
            <div className="div-input">
              <FaSearch className="search-icon search" />
              <input
                className="input-style-mobile"
                placeholder="What are you looking for?"
              />
            </div>
          </Col>
          <Col>
            <AiOutlineClose
              className="cursor"
              size={25}
              onClick={() => {
                setShowInput(false);
              }}
            />
          </Col>
        </>
      )}
      {/* <Col md={1}>
        <ThemeToggleButton />
      </Col> */}
    </Row>
  );
};

export default NavigationBarMobile;