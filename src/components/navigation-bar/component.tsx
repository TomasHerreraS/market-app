import { useState, useEffect } from "react";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import firstImage from "../../assets/carousel-img/pc.webp";
import ComponentJson from '../../data/component.json';
import '../../styles/component.css';

const Component = () => {
  const [show, setShow] = useState<boolean>(true);
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
      <Dropdown.Toggle className={ show ? 'dropdown-button picked' : 'dropdown-button'} id="dropdown-basic">
        PC Components
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-size font-color">
        <Row>
          {ComponentJson.map((obj, index)=>{
            return (
              <Col key={index} md={2}>
                <Row>
                  <Col className="text-center" md={windowWidth > 1360 ? 5 : 12}>
                    <Image
                    roundedCircle 
                    className='image-style'
                    src={firstImage}
                    alt="First slide"/>
                  </Col>
                  <Col className='col-submenu' md={windowWidth > 1360 ? 7 : 12}>
                    <a href="/" className='submenu-title'>{obj.title}</a>
                    {obj.sub.map((subData, number)=>{
                      return(
                        <a key={number} href="/" className={subData.length < 5 ? 'submenu-p-size' : 'submenu-p'}>{subData}</a>
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

export default Component;