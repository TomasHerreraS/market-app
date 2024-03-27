import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Form, Image, Button } from 'react-bootstrap';
import { CardTable as TypeCardTable } from './../type';
import { DataCard } from './data-card';


export const CardTable = ({data, setGetItemsPerPage, setGetCurrentPage, setGetIndexOfFirstItem, dataLength, card}: TypeCardTable) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
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

  return (
    <>
    <Row className='mt-5 ms-5'>
      <Col className='mb-3' md={2}>
        <Form.Select className='text-center' onChange={handleOnChange}>
          <option>3</option>
          <option>5</option>
          <option>7</option>
        </Form.Select>
      </Col>
      <DataCard dataArray={data}/>
      <Col className='mt-3' md={1}>
        <Pagination>
          {Array.from({ length: Math.ceil(dataLength / itemsPerPage) }, (_, index) => (  // Esta parte se encarga de la cantidad de pagination mostrada según la data
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Col>
    </Row>
    </>
  );
};
