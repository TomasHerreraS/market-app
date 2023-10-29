import { useState, useEffect } from "react";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import firstImage from "../../assets/carousel-img/pc.webp";
import PeripheralJson from '../../data/peripheral.json';
import '../../styles/peripheral.css';

const Peripheral = () => {
  const [show, setShow] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showDropdown = ()=>{
      setShow(!show);
  }

  const hideDropdown = () => {
      setShow(!show);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Dropdown show={show}
      onMouseEnter={showDropdown} 
      onMouseLeave={hideDropdown} className='main-dropdown'>
      <Dropdown.Toggle className="dropdown-button" id="dropdown-basic">
        Peripherals
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-size font-color">
        <Row>
          {PeripheralJson.map((obj, index)=>{
            return (
              <Col key={index} md={2}>
                <Row>
                  <Col className="text-center" md={windowWidth > 1360 ? 5 : 12}>
                    <Image
                    roundedCircle 
                    className={windowWidth > 1360 ? 'image-style' : 'image-style-responsive'}
                    src={firstImage}
                    alt="First slide"/>
                  </Col>
                  <Col className={windowWidth > 1360 ? 'col-submenu margin-submenu' : 'col-submenu-responsive'} md={windowWidth > 1360 ? 1 : 12}>
                    <a href="/" className={windowWidth > 1360 ? 'submenu-title text-center' : 'submenu-title-responsive text-center'}>{obj.title}</a>
                    {obj.sub.map((subData, number)=>{
                      return(
                        <a key={number} href="/" className={windowWidth > 1360 ? 'submenu-p text-center' : 'submenu-p-responsive text-center'}>{subData}</a>
                      )
                    })}
                  </Col>
                </Row>
              </Col>
            )
          })}
        </Row>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Peripheral;