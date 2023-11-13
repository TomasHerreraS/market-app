import { useState, useEffect } from "react";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import firstImage from "../../assets/carousel-img/pc.webp";
import PeripheralJson from "../../data/peripheral.json";
import "../../styles/peripheral.css";

const Peripheral = () => {
  const [show, setShow] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showDropdown = () => {
    setShow(true);
  };

  const hideDropdown =() => {
    setShow(false);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <Row className="g-0 justify-content-center">
          {PeripheralJson.map((obj, index) => {
            return (
              <Col key={index} md={2}>
                <Row className="g-0">
                  <Col className="text-center" md={windowWidth > 1360 ? 6 : 12}>
                    <Image
                      roundedCircle
                      className={
                        windowWidth > 1360
                          ? "image-style"
                          : "image-style-responsive"
                      }
                      src={firstImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col
                    className={
                      windowWidth > 1360
                        ? "col-submenu margin-submenu"
                        : "col-submenu-responsive"
                    }
                    md={windowWidth > 1360 ? 1 : 12}
                  >
                    <a
                      href="/"
                      className={
                        windowWidth > 1360
                          ? "submenu-title text-center"
                          : "submenu-title-responsive text-center"
                      }
                    >
                      {obj.title}
                    </a>
                    {obj.sub.map((subData, number) => {
                      return (
                        <a
                          key={number}
                          href="/"
                          className={
                            windowWidth > 1360
                              ? "submenu-p text-center"
                              : "submenu-p-responsive text-center"
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

export default Peripheral;
