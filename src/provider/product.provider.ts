import axios from 'axios';
import { ProductId } from '../utils/type';

export const getQuantity = async () => {
  try {
    const response = await axios.get('http://localhost:3001/getQuantity');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3001/getAllProducts');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductTable = async (firstIndex: number, lastIndex: number) => {
  try {
    const response = await axios.get('http://localhost:3001/getProductTable', {
      params: {
        limit: firstIndex,
        offset: lastIndex
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductLength = async () => {
  try {
    const response = await axios.get('http://localhost:3001/getProductLength');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buyProduct = async (id: ProductId) => {
  try {
    const response = await axios.post('http://localhost:3001/buyProduct', id)
    return response.data;
  } catch (error) {
    throw error;
  }
}