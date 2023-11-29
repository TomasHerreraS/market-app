import { Row, Col, Image, Button } from "react-bootstrap";
import firstImage from '../../assets/carousel-img/pc.webp';
import { truncateText } from "../../utils/truncate-text";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import '../../styles/cart.css';

const Product = () => {

  return(
    <div className="div-product-style">
      <h6 className="products-title">Products</h6>
      <hr/>
      <Row className="mt-4">
        <Col md={3}>
        <Image
          className="img-fluid image-style ms-3"
          rounded
          src={firstImage}
          alt="First slide"
        />
        </Col>
        <Col className="mt-3 col-description" md={5}>
          {truncateText('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, iure! A blanditiis corrupti est earum enim tenetur, aperiam debitis qui quia corporis dolore quae, dicta dolor quos error nemo nostrum similique, voluptates ipsa porro perspiciatis aspernatur. Magnam esse, consequuntur ducimus sint harum iste alias ex, facilis facere debitis modi aliquid? Corrupti nostrum atque non, nulla enim natus autem dolores ducimus totam, assumenda odit deleniti eius harum! Saepe, quibusdam nihil cupiditate dignissimos culpa quaerat voluptatibus eveniet ducimus tempora illo, nobis magnam est at nemo dolore hic nesciunt atque laborum ipsa distinctio sed veritatis sint amet nisi? Error assumenda voluptatum fugiat in.',
          85)}
        </Col>
        <Col className="mt-4 col-amount" md={2}>
          <Row className="div-amount">
            <Col md={4}>
              <FiMinus className="minus pointer" size={20}/>
            </Col>
            <Col md={4}>
              <p className="text-center amount"> 1 </p>
            </Col>
            <Col md={4}>
              <FiPlus className="plus pointer" size={20}/>
            </Col>
          </Row>
          <p className="available-style text-center">342 Available</p>
        </Col>
        <Col md={2}>
          <div className="mt-4 text-center">
            <Button variant="danger button-style"><FaTrash/></Button>
            <p>$ 38.890</p>
          </div>
        </Col>
      </Row>
      <hr/>
      <Row className="mt-4">
        <Col md={3}>
        <Image
          className="img-fluid image-style ms-3"
          rounded
          src={firstImage}
          alt="First slide"
        />
        </Col>
        <Col className="mt-3 col-description" md={5}>
          {truncateText('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, iure! A blanditiis corrupti est earum enim tenetur, aperiam debitis qui quia corporis dolore quae, dicta dolor quos error nemo nostrum similique, voluptates ipsa porro perspiciatis aspernatur. Magnam esse, consequuntur ducimus sint harum iste alias ex, facilis facere debitis modi aliquid? Corrupti nostrum atque non, nulla enim natus autem dolores ducimus totam, assumenda odit deleniti eius harum! Saepe, quibusdam nihil cupiditate dignissimos culpa quaerat voluptatibus eveniet ducimus tempora illo, nobis magnam est at nemo dolore hic nesciunt atque laborum ipsa distinctio sed veritatis sint amet nisi? Error assumenda voluptatum fugiat in.',
          85)}
        </Col>
        <Col className="mt-4 col-amount" md={2}>
          <Row className="div-amount">
            <Col md={4}>
              <FiMinus className="minus pointer" size={20}/>
            </Col>
            <Col md={4}>
              <p className="text-center amount"> 1 </p>
            </Col>
            <Col md={4}>
              <FiPlus className="plus pointer" size={20}/>
            </Col>
          </Row>
          <p className="available-style text-center">342 Available</p>
        </Col>
        <Col md={2}>
          <div className="mt-4 text-center">
            <Button variant="danger button-style"><FaTrash/></Button>
            <p>$ 38.890</p>
          </div>
        </Col>
      </Row>
      <hr/>
      <Row className="mt-4">
        <Col md={3}>
        <Image
          className="img-fluid image-style ms-3"
          rounded
          src={firstImage}
          alt="First slide"
        />
        </Col>
        <Col className="mt-3 col-description" md={5}>
          {truncateText('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, iure! A blanditiis corrupti est earum enim tenetur, aperiam debitis qui quia corporis dolore quae, dicta dolor quos error nemo nostrum similique, voluptates ipsa porro perspiciatis aspernatur. Magnam esse, consequuntur ducimus sint harum iste alias ex, facilis facere debitis modi aliquid? Corrupti nostrum atque non, nulla enim natus autem dolores ducimus totam, assumenda odit deleniti eius harum! Saepe, quibusdam nihil cupiditate dignissimos culpa quaerat voluptatibus eveniet ducimus tempora illo, nobis magnam est at nemo dolore hic nesciunt atque laborum ipsa distinctio sed veritatis sint amet nisi? Error assumenda voluptatum fugiat in.',
          85)}
        </Col>
        <Col className="mt-4 col-amount" md={2}>
          <Row className="div-amount">
            <Col md={4}>
              <FiMinus className="minus pointer" size={20}/>
            </Col>
            <Col md={4}>
              <p className="text-center amount"> 1 </p>
            </Col>
            <Col md={4}>
              <FiPlus className="plus pointer" size={20}/>
            </Col>
          </Row>
          <p className="available-style text-center">342 Available</p>
        </Col>
        <Col md={2}>
          <div className="mt-4 text-center">
            <Button variant="danger button-style"><FaTrash/></Button>
            <p>$ 38.890</p>
          </div>
        </Col>
      </Row>
      <hr/>
    </div>
  )
}

export default Product;