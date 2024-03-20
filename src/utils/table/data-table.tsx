import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Pagination, Form } from 'react-bootstrap';
import { Table as TableType } from './../type';
import { DeleteButton, EditButton, VisualizeButton } from "../../components/buttons/table-button";

export const DataTable = ({data, setGetItemsPerPage, setGetCurrentPage, setGetIndexOfFirstItem, dataLength, updateButton, deleteButton}: TableType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [dynamic, setDynamic] = useState<any[]>([]);
  const [dynamicObject, setDynamicObject] = useState<any[]>([]);
  const [objectKey, setObjectKey] = useState<any[]>([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Cambia de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(()=>{
    setGetItemsPerPage(itemsPerPage);
    setGetCurrentPage(currentPage);
    setGetIndexOfFirstItem(indexOfFirstItem);
  }, [itemsPerPage, currentPage, indexOfFirstItem]);

  // Esta función se encarga de la cantidad de data por página.
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
  }

  useEffect(()=>{
    if (currentPage !== 1 && data.length === 0) {
      setCurrentPage(currentPage-1);
    }
  }, [data, itemsPerPage]);

  // TODO: traer headProductData y bodyProductData solo si es requerida.
  
  useEffect(() => {
    if (data.length > 0) {
      const firstObject = data[0];
      setObjectKey(Object.keys(firstObject))
    }
  }, [data]);

  useEffect(() => {
    if (updateButton && objectKey.length > 0) {
      setObjectKey((prev) => {
        const update = "Update";
        // Verificar si la clave "Update" ya existe en el estado
        if (!prev.includes(update)) {
          // Si no existe, agregarla al estado
          return [...prev, update];
        }
        // Si ya existe, devolver el estado sin cambios
        return prev;
      });
    }
    if (deleteButton && objectKey.length > 0) {
      setObjectKey((prev) => {
        const deleteHeader = "Delete";
        // Verificar si la clave "Update" ya existe en el estado
        if (!prev.includes(deleteHeader)) {
          // Si no existe, agregarla al estado
          return [...prev, deleteHeader];
        }
        // Si ya existe, devolver el estado sin cambios
        return prev;
      });
    }
  }, [objectKey]); // Solo se ejecuta cuando updateButton cambia
  

  useEffect(()=>{
    if (dynamic.length !== 0) {
      setDynamic([]);
    }
    if (objectKey && objectKey.length > 0) {
      for (let z = 0; z < data.length; z++) {
        for (let i = 0; i < objectKey.length; i++) {
          if (data && objectKey.length > 0) {
            const object = [data[z][objectKey[i]]]
            setDynamic((prev: any[]) => [...prev, ...object])
          }
        }
      }
    }
  }, [objectKey, data]);
  
  useEffect(()=> {
    const group = [];
    const arrayDynamicLength = dynamic.length;
    const groupSlicer = objectKey.length;
    for (let i = 0; i < arrayDynamicLength; i += groupSlicer) {
      const part = dynamic.slice(i, i + groupSlicer);
      const groupObject = { id: i / groupSlicer + 1 , element: part};
      group.push(groupObject);
      setDynamicObject(group);
    }
  }, [dynamic, objectKey])

  const final = () => {
    const patron = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    const keyLength: number = objectKey.length;
  
    return dynamicObject?.map((data: any, index: any)=> (
      <tr key={index}>
        {data.element.slice(0, keyLength).map((element: any, index2: number) => (
          <td key={index2} className='text-center'>
            {typeof element === 'object' ? Array.isArray(element) ?
              element.join(', ') : element :
              (patron.test(element) ? element.split('T')[0] :
                (objectKey[index2] === 'Update' ? <EditButton/> :
                  (objectKey[index2] === 'Delete' ? <DeleteButton/> :
                    (objectKey[index2].includes('image') ? <VisualizeButton/> : element))))
            }
          </td>
        ))}
      </tr>
    ))
  }

  return (
    <>
    {objectKey.length > 0 ?
    <Row className='m-5'>
      <Col className='mb-3' md={1}>
        <Form.Select className='text-center' onChange={handleOnChange}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </Form.Select>
      </Col>
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {objectKey.map((data, index)=> (
                <th key={index} className='text-center'>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {final()}
          </tbody>
        </Table>
      </Col>
      <Col md={1}>
        <Pagination>
          {Array.from({ length: Math.ceil(dataLength / itemsPerPage) }, (_, index) => (  // Esta parte se encarga de la cantidad de pagination mostrada según la data
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Col>
    </Row>: <p className='ms-3'>No data in table</p>}
    </>
  );
};
