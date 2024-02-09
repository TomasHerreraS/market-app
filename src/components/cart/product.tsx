import { Row, Col, Image, Button } from "react-bootstrap";
import firstImage from '../../assets/carousel-img/pc.webp';
import { truncateText } from "../../utils/truncate-text";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getQuantity, getAllProducts } from "../../provider/product.provider";
import '../../styles/cart.css';
import { ProductData } from "../../type";

const Product = () => {
  const [quantity, setQuantity] = useState<{quantity: number}>();
  const [getProducts, setGetProducts] = useState<any>([]);

  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const quantityData = await getQuantity();
        setQuantity(quantityData.quantity);
        console.log(quantityData);
      } catch (error) {
        console.error('Error getting quantity:', error);
      }
    };

    fetchQuantity();

    // No necesitas especificar una función de limpieza en este caso

  }, []);

  useEffect(()=>{
    getAllProducts().then((result)=>{
      setGetProducts(result); 
      console.log(result)
    }).catch((error) => console.log(error))
  }, [])

  return(
    <div className="div-product-style">
      <h6 className="products-title">Products</h6>
      <hr/>
      {getProducts.map((obj: any, index: any)=>{
        return (
          <Row key={index} className="mt-4">
            <Col className="text-center" md={3}>
              <Image
                className="img-fluid image-style ms-3"
                rounded
                src={`data:image/jpeg;base64,${obj.image}`}
                alt={obj.name}
              />
              <p className="text-center">{obj.name}</p>
            </Col>
            <Col className="text-center mt-3 col-description" md={5}>
              {truncateText(obj.description,85)}
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
              <p className="available-style text-center">{obj.quantity} Available</p>
            </Col>
            <Col md={2}>
              <div className="mt-4 text-center">
                <Button className="ms-2" variant="danger button-style"><FaTrash/></Button>
                <p className="mt-1">$ {obj.price}</p>
              </div>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

export default Product;