import { useState } from "react";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import firstImage from "../../../assets/carousel-img/pc.webp";
import PeripheralJson from "../../../data/peripheral.json";
import useWindowDimensions from "../../../utils/market-functions/screen-size";
import "../../../styles/peripheral.css";

const Peripheral = () => {
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
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
        className={show ? "dropdown-button picked" : "dropdown-button"}
        id="dropdown-basic"
      >
        Peripherals
      </Dropdown.Toggle>
      <Dropdown.Menu
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
        className="dropdown-size font-color"
      >
        <Row className="g-0">
          {PeripheralJson.map((obj, index) => {
            return (
              <Col key={index} md={2}>
                <Row className="g-0">
                  <Col
                    className="text-center"
                    md={windowDimensions > 1360 ? 6 : 12}
                  >
                    <Image
                      roundedCircle
                      className="image-style"
                      src={firstImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col
                    className="col-submenu"
                    md={windowDimensions > 1360 ? 1 : 12}
                  >
                    <a href="/" className="submenu-title">
                      {obj.title}
                    </a>
                    {obj.sub.map((subData, number) => {
                      return (
                        <a
                          key={number}
                          href="/"
                          className="submenu-p"
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

export default Peripheral;
