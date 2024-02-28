import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Pagination, Form } from 'react-bootstrap';
import { bodyProductData, headProductData } from './data';
import { Table as TableType } from './../type';

export const DataTable = ({data, setGetItemsPerPage, setGetCurrentPage, setGetIndexOfFirstItem, dataLength, type}: TableType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
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

  const showData = () => {
    if (type === 'product') {
      return <Table striped bordered hover>
      <thead>
        <tr>
          {headProductData()}
        </tr>
      </thead>
      <tbody>
        {bodyProductData(data)}
      </tbody>
    </Table>
    } else if (type === 'user') {
      // data de user
    } else if (type === 'record') {
      // data de record
    } else {
      return <p>An error occurred, please try again.</p>
    }
  }

  return (
    <Row>
      <Col className='mb-3' md={1}>
        <Form.Select className='text-center' onChange={handleOnChange}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </Form.Select>
      </Col>
      <Col md={12}>
        {showData()}
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
    </Row>
  );
};
