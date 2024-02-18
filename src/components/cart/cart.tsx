import { Row, Col, Image, Button } from "react-bootstrap";
import { truncateText } from "../../utils/truncate-text";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getQuantity, getAllProducts, buyProduct } from "../../provider/product.provider";
import '../../styles/cart.css';
import { ProductData, Quantity } from "../../type";
import { socket } from "../../utils/socket";

const Cart = () => {
  const [quantity, setQuantity] = useState<Quantity[]>([]);
  const [getProducts, setGetProducts] = useState<ProductData[]>([]);
  const [price, setPrice] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getQuantity().then((result)=> {
      setQuantity(result)
    })
  },[]);

  useEffect(()=>{
    getAllProducts().then((result)=>{
      setGetProducts(result);
    }).catch((error) => console.log(error))
  }, [])


  // Se acumulan los price en un array cada vez que se agrega un product nuevo al cart
  useEffect(()=>{
    const productPrice = getProducts.map((obj: ProductData) => obj.price)
    setPrice((prev: number[]) => [...prev, ...productPrice])
  }, [getProducts]);

  useEffect(()=>{
    setTotal(price.reduce((acc: number, prices: string) => {
      const priceParsed = parseFloat(prices);
      if (!isNaN(priceParsed)) {
        acc += priceParsed;
      }
      console.log(acc)
      return acc;
    }, 0))
  }, [price]);

  useEffect(()=>{
    // console.log(total)
  }, [total]);

  useEffect(() => {
    // Escuchar el evento 'quantityUpdated' del servidor
    socket.on('quantityUpdated', () => {
      getQuantity().then((result)=> {
        setQuantity(result);
      })
      // Actualizar la cantidad de productos en el estado
      // Aquí podrías llamar a una función para obtener la nueva cantidad desde el servidor si es necesario
    });

    // Limpieza del efecto
    return () => {
      socket.off('quantityUpdated');
    };
  }, []);

  return(
    <Row className="g-0">
      <Col md={8}>
        <div className="div-product-style">
          <h6 className="products-title">Products</h6>
          <hr/>
          {getProducts.map((obj: ProductData, index: any)=>{
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
                  {quantity.map((quantity, secondIndex: number) => {
                    if (quantity.product_id === obj.product_id) {
                      return (
                        <p key={secondIndex} className="available-style text-center">{quantity.quantity} Available</p>
                      )
                    } else {
                      return (null)
                    }
                  })}
                </Col>
                <Col md={2}>
                  <div className="mt-4 text-center">
                    <Button className="ms-2" variant="danger button-style"><FaTrash/></Button>
                    <p className="mt-1">$ {obj.price}</p>
                  </div>
                </Col>
                <Col>
                  <Button onClick={() => {
                    try{
                      buyProduct({product_id: obj.product_id}).then(()=>{
                        socket.emit('quantityUpdated')
                      })
                    } catch(error) {
                      console.log(error);
                    }
                  }}>Borrar?</Button>
                </Col>
              </Row>
            )
          })}
        </div>
      </Col>
      <Col md={4}>
        <div className="div-total-style">
        <h6 className="total-title">Purchase summary</h6>
        <hr/>
        <Row className="mt-4 ps-3 pe-3 product-shipment-style">
          <Col md={{ span: 8, offset: 0}}>
            {getProducts.length > 1 ?
            <p>Products ({getProducts.length})</p>: <p>Product ({getProducts.length})</p>}
          </Col>
          <Col>
            <p>$40.000</p>
          </Col>
          <Col md={{ span: 8, offset: 0}}>
            <p>Shipment</p>
          </Col>
          <Col>
            <p className="shipment-color">Free</p>
          </Col>
          </Row>
          <Row className="ps-3 pe-3 total-price-style">
            <Col md={{ span: 8, offset: 0}}>
              <p>Total</p>
            </Col>
            <Col>
              <p>${total.toFixed(2)}</p>
            </Col>
          </Row>
          <Row className="ps-5 mb-2">
            <Col md={{ span: 0, offset: 3}}>
              <Button>Go to pay</Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  )
}

export default Cart;