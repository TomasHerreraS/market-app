import { useState, useEffect } from "react";
import { Button, Col, Image, Row } from "react-bootstrap"
import { truncateText } from '../market-functions/truncate-text';
import { TransformImage } from '../market-functions/transform-image';
import { FiMinus, FiPlus } from "react-icons/fi"
import { FaTrash } from "react-icons/fa";
import { Quantity } from "../../utils/type";
import { getQuantity } from "../../provider/product.provider";
import { socket } from "../../utils/socket";
import '../../styles/cart.css';

export const DataCard = ({ dataArray }: { dataArray: any }) => {
  const [quantity, setQuantity] = useState<Quantity[]>([]);

  useEffect(() => {
    getQuantity().then((result)=> {
      setQuantity(result)
    })
  },[]);

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

  // TODO: Hacer funcional los plus or minus segun quantity

  return (
    <Col md={12}>
      <div className="div-product-style">
      <h6 className="products-title">Products</h6>
      <hr/>
      {dataArray.length > 0 ?
        dataArray.map((obj: any, index: number) => (
        <Row
          key={index}
          className="mt-4">
          <Col className="text-center" md={3}>
            <Image
              className="img-fluid image-style text-center"
              rounded
              src={TransformImage(obj.image1)}
            //   alt={obj.name}
            />
            <p className="text-center">{truncateText(obj.name, 27)}</p>
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
            {/* <Button onClick={() => {
              try{
                buyProduct({product_id: obj.product_id}).then(()=>{
                  socket.emit('quantityUpdated')
                })
              } catch(error) {
                console.log(error);
              }
            }}>Borrar?</Button> */}
          </Col>
        </Row>
      )): null}
      </div>
    </Col>
  )
}