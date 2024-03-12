import { useEffect, useState } from "react";
import { DataTable } from "../../utils/table/data-table"
import { getHistoryLength, getHistoryTable } from "../../provider/history.provider";
import { Col, Row, Form } from "react-bootstrap";

export const History = () => {
  const [adminFilters, setAdminFilters] = useState<boolean>(false); 
  const [crud, setCrud] = useState<string>('');
  const [table, setTable] = useState<string>('');
  const [dataFiltering, setDataFiltering] = useState([]);
  const [noData, setNoData] = useState<boolean>(false);
  // ESTOS SON LOS DATOS NECESARIOS PARA QUE FUNCIONE LA TABLE
  const [data, setData] = useState<any>([]); // ESTÁ TRAERÁ DESDE EL BACKEND LA FUNCION GETPRODUCTTABLE, QUE TRAE DATA ESPECIFICA SEGÚN EL PARAMETRO
  const [getItemsPerPage, setGetItemsPerPage] = useState(0);  // ACÁ SE MANDA EL SET, PARA CONSEGUIR DEL COMPONENTE HIJO LA CANTIDAD DE ITEMS POR PAGE
  const [getCurrentPage, setGetCurrentPage] = useState(0); // ACÁ SE MANDA EL SET, PARA CONSEGUIR DEL COMPONENTE HIJO LA CANTIDAD DE PÁGINAS EN TOTAL
  const [getIndexOfFirstItem, setGetIndexOfFirstItem] = useState(0); // ACÁ SE MANDA EL SET, PARA OBTENER EL INDEX PER PAGE.
  const [dataLength, setDataLength] = useState<number>(0); // CON ESTE OBTENEMOS EL LENGTH DE TODA LA DATA, PARA SER ENVIADA Y USADA COMO PAGINATION

  useEffect(()=>{ // ACÁ OBTENEMOS LA DATA DEL PRODUCTO, SEGÚN EL PARAMETRO
    getHistoryTable(getItemsPerPage, getIndexOfFirstItem).then((result) => {
      setData(result);
      setDataFiltering(result);
    })
  }, [getCurrentPage, getItemsPerPage]);

    // Consigue el length de productos de la db para saber la cantidad de pagination
  useEffect(()=>{
    getHistoryLength().then((result: number) => {
      setDataLength(result);
    })
  }, []);

  useEffect(() => {
    if (dataFiltering) {
      let filteredData = dataFiltering;
  
      // Aplica el filtro si es que existe, y sino, muestra todos los valores que el filtro aplicaba.
      if (crud !== '') {
        filteredData = filteredData.filter((obj: any) => obj.action === crud);
      } else {
        filteredData = filteredData.filter((obj: any) => obj.action);
        console.log(filteredData)
      }
  
      if (table !== '') {
        filteredData = filteredData.filter((obj: any) => obj.table === table);
      } else {
        filteredData = filteredData.filter((obj: any) => obj.table);
      }
      // TODO: Agregar el filtro de rol y del input email, y agregarlo como dependencia de este useEffect
      // Aplicar filtro de rol si existe
      // if (rol) {
      //   filteredData = filteredData.filter((obj: any) => obj.rol === rol);
      // }
      if (filteredData.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
      setData(filteredData); // Reiniciar mensaje si hay datos
    }
  }, [dataFiltering, crud, table]);

  const adminOption = () => {
    const onChangeCrudFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCrud(e.target.value);
    }

    const onChangeTableFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTable(e.target.value);
    }
    
    return (
      <>
        <Col className="ms-5 mt-3" md={2}>
          <Form.Select onChange={(e) => onChangeCrudFilter(e)}>
            <option value=''>No filter</option>
            <option>Add</option>
            <option>Update</option>
            <option>Delete</option>
          </Form.Select>
        </Col>
        <Col className="ms-5 mt-3" md={2}>
          <Form.Select onChange={(e) => onChangeTableFilter(e)}>
            <option value=''>No filter</option>
            <option>Product</option>
            <option>User</option>
          </Form.Select>
        </Col>
      </>
    )
  }

  const onChangeAdminFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'Administrator') {
        setAdminFilters(true);
    } else {
        setAdminFilters(false);
    }
  }

  // TODO: Poder ver Boleta electronica del cliente????

  return (
    <Row md={12}>
      <Col className="ms-5 mt-3" md={2}>
        <Form.Control type="text" placeholder="Email"/>
      </Col>
      <Col className="ms-5 mt-3" md={2}>
        <Form.Select onChange={(e) => onChangeAdminFilter(e)}>
          <option value=''>No filter</option>
          <option>Administrator</option>
          <option>Client</option>
        </Form.Select>
      </Col>
      {adminFilters ? adminOption(): null}
      <Col md={12}>
        {noData === true ? <p>No hay datos con esos filtros</p>:
        <DataTable 
        data={data}
        setGetItemsPerPage={setGetItemsPerPage}
        setGetCurrentPage={setGetCurrentPage}
        setGetIndexOfFirstItem={setGetIndexOfFirstItem}
        dataLength={dataLength}
        updateButton={false}
        deleteButton={false}/>}
      </Col>
    </Row>
  )
}