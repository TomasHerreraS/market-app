import { useEffect, useState, ChangeEvent } from "react";
import { DataTable } from "../../utils/table/data-table"
import { getHistoryLength, getHistoryTable, getHistoryTableByFilter } from "../../provider/history.provider";
import { Col, Row, Form } from "react-bootstrap";
import { FilterTable, DateFilter } from "../../utils/type";

export const History = () => {
  const [adminFilters, setAdminFilters] = useState<boolean>(false);
  const [dataFiltering, setDataFiltering] = useState([]);
  const [noData, setNoData] = useState<boolean>(false);

  // ESTOS SON LOS DATOS NECESARIOS PARA QUE FUNCIONE LA TABLE
  const [data, setData] = useState<any>([]); // ESTÁ TRAERÁ DESDE EL BACKEND LA FUNCION GETPRODUCTTABLE, QUE TRAE DATA ESPECIFICA SEGÚN EL PARAMETRO
  const [getItemsPerPage, setGetItemsPerPage] = useState(0);  // ACÁ SE MANDA EL SET, PARA CONSEGUIR DEL COMPONENTE HIJO LA CANTIDAD DE ITEMS POR PAGE
  const [getCurrentPage, setGetCurrentPage] = useState(0); // ACÁ SE MANDA EL SET, PARA CONSEGUIR DEL COMPONENTE HIJO LA CANTIDAD DE PÁGINAS EN TOTAL
  const [getIndexOfFirstItem, setGetIndexOfFirstItem] = useState(0); // ACÁ SE MANDA EL SET, PARA OBTENER EL INDEX PER PAGE.
  const [dataLength, setDataLength] = useState<number>(0); // CON ESTE OBTENEMOS EL LENGTH DE TODA LA DATA, PARA SER ENVIADA Y USADA COMO PAGINATION

  // useEffect(()=>{ // ACÁ OBTENEMOS LA DATA DEL PRODUCTO, SEGÚN EL PARAMETRO
  const [arrayFilter, setArrayFilter] = useState<FilterTable>({email: '', phone: '', role: '', action: '', table: ''});
  const [dateFilter, setDateFilter] = useState<DateFilter>({initDate: '', finalDate: ''})

  // Consigue el length de productos de la db para saber la cantidad de pagination
  useEffect(()=>{
    getHistoryLength().then((result: number) => {
      setDataLength(result);
    })
  }, []);


  useEffect(()=>{
    getHistoryTableByFilter(arrayFilter, getItemsPerPage, getIndexOfFirstItem, dateFilter).then((result)=> {
      console.log(result)
      setData(result)
      setDataFiltering(result)}
    )
  }, [dataLength, arrayFilter, getItemsPerPage, getIndexOfFirstItem, dateFilter, getCurrentPage]);

  useEffect(() => {
    if (dataFiltering) {
      let filteredData = dataFiltering;
      if (filteredData.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    }
  }, [dataFiltering]);

  const onChangeRoleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value
    setArrayFilter((prev) => ({ ...prev, role: role}))
    if (e.target.value === 'Administrator') {
        setAdminFilters(true);
    } else {
        setAdminFilters(false);
    }
  }

  const onChangeEmailFilter = (e: React.ChangeEvent<any>) => {
    const email = e.target.value;
    if (email !== '') {
      setArrayFilter((prev) => ({ ...prev, email: email}))
    } else {
      setArrayFilter((prev) => ({ ...prev, email: ''}))
    }
  }

  const [phoneValue, setPhoneValue] = useState<string>('');

  const handlePhoneValue = (e: any) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    let formattedValue = '';

    if (value.length <= 10) {
      if (value.length > 0) {
        formattedValue = `(${value.slice(0, 3)}`; // The first 3 numbers will have parentheses and a space
        if (value.length > 2) {
          formattedValue += ') ';
        }
        if (value.length > 6) {
          formattedValue += `${value.slice(3, 6)}-${value.slice(6, 10)}`; // if the value is greater than 6, it will be separated with a dash
        } else {
          formattedValue += value.slice(3); // If the value is less than or equal to 6, it will fill with numbers without restriction
        }
      } else {
        formattedValue = value;
      }
      setPhoneValue(formattedValue);
    }
  };

  useEffect(()=>{
    setArrayFilter((prev) => ({ ...prev, phone: phoneValue}))
  }, [phoneValue])

  const adminOption = () => {
    const onChangeCrudFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const crud = e.target.value;
      setArrayFilter((prev) => ({ ...prev, action: crud}))
    }

    const onChangeTableFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const table = e.target.value;
      setArrayFilter((prev) => ({ ...prev, table: table}))
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

  const onChangeDate = (e: React.ChangeEvent<any>, init: boolean) => {
    const inputDate = e.target.value;
    if (init === true) {
      setDateFilter((prev) => ({ ...prev, initDate: inputDate}))
    } else {
      setDateFilter((prev) => ({ ...prev, finalDate: inputDate}))
    }
  }

  return (
    <Row md={12}>
      <Col className="ms-5 mt-3" md={2}>
        <Form.Control type="text" placeholder='Email' onChange={(e) => onChangeEmailFilter(e)}/>
      </Col>
      <Col className="ms-5 mt-3" md={2}>
        <Form.Control type="text" placeholder='Phone' value={phoneValue} onChange={(e) => handlePhoneValue(e)}/>
      </Col>
      <Col className="ms-5 mt-3" md={2}>
      <Form.Control type="date" placeholder="Select a Date" onChange={(e) => onChangeDate(e, true)}/>
      </Col>
      <Col className="ms-5 mt-3" md={2}>
      <Form.Control type="date" placeholder="Select a Date" onChange={(e) => onChangeDate(e, false)}/>
      </Col>
      <Col className="ms-5 mt-3" md={2}>
        <Form.Select onChange={(e) => onChangeRoleFilter(e)}>
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