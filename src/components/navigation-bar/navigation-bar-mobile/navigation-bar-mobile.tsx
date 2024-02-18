import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Stack,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SignIn from "../../sign-in/sign-in";
import SignUp from "../../sign-up/sign-up";
import { FaSearch } from "react-icons/fa";
import ThemeToggleButton from "../../buttons/theme-button";
import { Fan } from "react-bootstrap-icons";
import { IconContext } from "react-icons";
import { BsCart3 } from "react-icons/bs";
import { SidebarData } from "./sidebar-data";
import { Link } from "react-router-dom";
import exportedFunctions from "../../../utils/link";
import "../../../styles/navigation-bar-mobile.css";

const NavigationBarMobile: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const redirectToMainPage = exportedFunctions.useRedirectToMainPage();

  const showSidebar = () => setSidebar(!sidebar);

  let loggedIn = 1;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Row className="background-color text-color padding g-0 align-items-center justify-content-between">
      <Col xs={2}>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="icon-side-bar">
            <FaIcons.FaBars
              onClick={showSidebar}
              size={30}
              className="cursor"
            />
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <Stack
                direction="horizontal"
                className="justify-content-between me-3 my-3"
              >
                <BsCart3 size={30} className="cursor" />
                <AiIcons.AiOutlineClose size={30} className="cursor" />
              </Stack>
              {SidebarData.map((item, index) =>
                loggedIn === 0 &&
                (item.title === "Sign in" || item.title === "Sign up") ? (
                  <li key={index} className={item.cName}>
                    <a
                      className="no-link"
                      onClick={() => {
                        if (item.title === "Sign up") {
                          setShowSignUp(true);
                        } else if (item.title === "Sign in") {
                          setShowSignIn(true);
                        }
                      }}
                    >
                      {item.title}
                    </a>
                  </li>
                ) : (item.title !== "Sign in" && item.title !== "Sign up" && item.path) ? (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </nav>
          <SignUp show={showSignUp} setShow={setShowSignUp} />
          <SignIn show={showSignIn} setShow={setShowSignIn} />
        </IconContext.Provider>
      </Col>
      <Col xs={5} className="text-center">
        <Fan onClick={redirectToMainPage} className="cursor" size={30} />
      </Col>
      <Col xs={2} className="align-items-center">
        <Stack direction="horizontal" className="justify-content-between">
          <ThemeToggleButton />
          <FaSearch
            className="cursor search"
            size={23}
            onClick={handleSearch}
          />
        </Stack>
      </Col>
      <div
        className={
          showSearch ? "div-input-mobile" : "div-input-mobile-invisible"
        }
        ref={searchInputRef}
      >
        <InputGroup>
          <Button size="sm">Search</Button>
          <FormControl placeholder="What are you looking for?" />
        </InputGroup>
      </div>
    </Row>
  );
};

export default NavigationBarMobile;
