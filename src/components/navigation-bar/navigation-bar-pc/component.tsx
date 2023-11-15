import { useState, useEffect } from "react";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import firstImage from "../../../assets/carousel-img/pc.webp";
import ComponentJson from "../../../data/component.json";
import useWindowDimensions from "../../../utils/screen-size";
import "../../../styles/component.css";

const Component = () => {
  const [show, setShow] = useState<boolean>(false);
  const windowDimensions = useWindowDimensions();

  const showDropdown = () => {
      setShow(true);
  };
  
  const hideDropdown = () => {
      setShow(false);
  };
  
  return (
    <Dropdown show={show} className="main-dropdown">
      <Dropdown.Toggle
        onMouseOver={showDropdown}
        onMouseLeave={hideDropdown}
        className={show ? "dropdown-button picked" : "dropdown-button"}
        id="dropdown-basic"
      >
        PC Components
      </Dropdown.Toggle>
      <Dropdown.Menu
        onMouseOver={showDropdown}
        onMouseLeave={hideDropdown}
        className="dropdown-size font-color"
      >
        <Row className="g-0 justify-content-center">
          {ComponentJson.map((obj, index) => {
            return (
              <Col key={index} md={2}>
                <Row className="g-0">
                  <Col className="text-center" md={windowDimensions > 1360 ? 5 : 12}>
                    <Image
                      roundedCircle
                      className="image-style"
                      src={firstImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col className="col-submenu" md={windowDimensions > 1360 ? 7 : 12}>
                    <a href="/" className="submenu-title">
                      {obj.title}
                    </a>
                    {obj.sub.map((subData, number) => {
                      return (
                        <a
                          key={number}
                          href="/"
                          className={
                            subData.length < 5 ? "submenu-p-size" : "submenu-p"
                          }
                        >
                          {subData}
                        </a>
                      );
                    })}
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Component;
