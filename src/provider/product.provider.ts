import axios from 'axios';

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