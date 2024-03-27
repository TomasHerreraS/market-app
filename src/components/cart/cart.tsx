import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllProducts, getProductTable, getProductLength } from "../../provider/product.provider";
import '../../styles/cart.css';
import { ProductData } from "../../utils/type";
import { CardTable } from "../../utils/table/card-table";

const Cart = () => {
  const [getProducts, setGetProducts] = useState<ProductData[]>([]);
  const [price, setPrice] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);

  // ESTOS SON LOS DATOS NECESARIOS PARA QUE FUNCIONE LA TABLE
  const [data, setData] = useState([]); // ESTÁ TRAERÁ DESDE EL BACKEND LA FUNCION GETPRODUCTTABLE, QUE TRAE DATA ESPECIFICA SEGÚN EL PARAMETRO
  const [getItemsPerPage, setGetItemsPerPage] = useState(0);  // ACÁ SE MANDA EL SET, PARA CONSEGUIR DEL COMPONENTE HIJO LA CANTIDAD DE ITEMS POR PAGE
  const [getCurrentPage, setGetCurrentPage] = useState(0); // ACÁ SE MANDA EL SET, PARA CONSEGUIR DEL COMPONENTE HIJO LA CANTIDAD DE PÁGINAS EN TOTAL
  const [getIndexOfFirstItem, setGetIndexOfFirstItem] = useState(0); // ACÁ SE MANDA EL SET, PARA OBTENER EL INDEX PER PAGE.
  const [dataLength, setDataLength] = useState<number>(0); // CON ESTE OBTENEMOS EL LENGTH DE TODA LA DATA, PARA SER ENVIADA Y USADA COMO PAGINATION

  useEffect(()=>{ // ACÁ OBTENEMOS LA DATA DEL PRODUCTO, SEGÚN EL PARAMETRO
    getProductTable(getItemsPerPage, getIndexOfFirstItem).then((result) => {
      setData(result);
    })
  }, [getCurrentPage, getItemsPerPage]);

  // Consigue el length de productos de la db para saber la cantidad de pagination
  useEffect(()=>{
    getProductLength().then((result: number) => {
      setDataLength(result);
    })
  }, []);

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
      return acc;
    }, 0))
  }, [price]);

  return(
    <Row className="g-0">
      <Col md={8}>
      <CardTable
        data={data}
        setGetItemsPerPage={setGetItemsPerPage}
        setGetCurrentPage={setGetCurrentPage}
        setGetIndexOfFirstItem={setGetIndexOfFirstItem}
        dataLength={dataLength}
        card='Cart'/>
      </Col>
      <Col md={4}>
        <div className="div-total-style">
        <h6 className="total-title">Purchase summary</h6>
        <hr/>
        <Row className="mt-4 ps-3 pe-3 product-shipment-style">
          <Col md={{ span: 8, offset: 0}}>
            <p>Product{getProducts.length > 1 ? 's' : null}</p>
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
      {/* <DataTable 
      data={data}
      setGetItemsPerPage={setGetItemsPerPage}
      setGetCurrentPage={setGetCurrentPage}
      setGetIndexOfFirstItem={setGetIndexOfFirstItem}
      dataLength={dataLength}
      updateButton={true}
      deleteButton={true}/> */}
    </Row>
  )
}

export default Cart;