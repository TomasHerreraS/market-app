import { useState } from "react";
import { IconContext } from 'react-icons';
import {AiOutlineClose, AiOutlinePlusCircle, AiOutlineMinusCircle   } from 'react-icons/ai';
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import firstImage from '../../../assets/carousel-img/pc.webp';
import "../../../styles/navigation-bar-pc.css";
import exportedFunctions from "../../../utils/link";

const SideCart = () => {
  const [showCart, setShowCart] = useState(false);  
  const showSidebar = () => setShowCart(!showCart);
  const redirectToCartPage = exportedFunctions.useRedirectToCart();

  return (
    <div className="notification">
      <div className="notification-circle"></div>
      <span className="notification-count">
        1
      </span>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="icon-side-bar-pc">
          <Link to='#'>
            <BsCart3 className="align-end cursor" size={25} onClick={showSidebar}/>
          </Link>
        </div>
        <nav className={showCart ? 'nav-menu-pc active' : 'nav-menu-pc'}>
          <ul className='nav-menu-items-pc' onClick={showSidebar}>
            <li className='navbar-toggle-pc'>
              <AiOutlineClose className="close-icon cursor" size={30}/>
            </li>
            <Card className="mb-4">
                <Card.Img variant="top" src={firstImage} />
                <Card.Body>
                  <Card.Text className="text-center">Product Name</Card.Text>
                  <p>Description about product</p>
                  <p>Price: $123123</p>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Img variant="top" src={firstImage} />
                <Card.Body>
                  <Card.Text className="text-center">Product Name</Card.Text>
                  <p>Description about product</p>
                  <p>Price: $123123</p>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Img variant="top" src={firstImage} />
                <Card.Body>
                  <Card.Text className="text-center">Product Name</Card.Text>
                  <p>Description about product</p>
                  <p>Price: $123123</p>
                </Card.Body>
            </Card>
            <Button onClick={redirectToCartPage} variant="secondary">Go to pay</Button>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  )
}

export default SideCart;