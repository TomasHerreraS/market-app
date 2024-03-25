import { useState, useEffect } from "react";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import firstImage from "../../../assets/carousel-img/pc.webp";
import ComponentJson from "../../../data/component.json";
import useWindowDimensions from "../../../utils/market-functions/screen-size";
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
        Categories
      </Dropdown.Toggle>
      <Dropdown.Menu
        onMouseOver={showDropdown}
        onMouseLeave={hideDropdown}
        className="dropdown-size font-color"
      >
        <Row className="ms-3 g-0">
          {ComponentJson.map((obj, index) => {
            return (
              <Col key={index} md={2}>
                <Row className="g-0">
                  <Col
                    className="text-center"
                    md={windowDimensions > 1360 ? 5 : 12}
                  >
                    <Image
                      roundedCircle
                      className="image-style text-center"
                      src={firstImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col
                    className="col-submenu p-3"
                    md={windowDimensions > 1360 ? 7 : 12}
                  >
                    <a href={obj.title_path} className="submenu-title">
                      {obj.title}
                    </a>
                    {obj.sub.sub_title.map((subTitle, index) => {
                      return (
                        <a
                          key={index}
                          href={obj.sub.sub_path[index]}
                          className={
                            subTitle.length < 5 ? "submenu-p-size" : "submenu-p"
                          }
                        >
                          {subTitle}
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
