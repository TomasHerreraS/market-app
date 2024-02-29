import axios from 'axios';
import { ProductId } from '../type';

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

export const buyProduct = async (id: ProductId) => {
  try {
    const response = await axios.post('http://localhost:3001/buyProduct', id)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getProductById = async (id: number) => {
  try {
    const response = await axios.post('http://localhost:3001/getProductById', {
      product_id: id
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addProduct = async (formData: FormData): Promise<any> => {
  try {
    // Make an HTTP POST request to the server
    const response = await axios.post('http://localhost:3001/addProduct', formData, {
      // Specify headers for multipart form data
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Return the data received from the server
    return response.data;
  } catch (error) {
    // Handle errors gracefully
    console.error('Error adding product:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getFavorite = async (id: number) => {
  try {
    const response = await axios.post('http://localhost:3001/getFavorite', id);
    return response.data
  } catch (error) {
    throw error;
  }
};

export const addToFavorite = async (product_id: number, user_id: number) => {
  try {
    const response = await axios.post('http://localhost:3001/addToFavorite', {
        product_id: product_id,
        user_id: user_id
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const removeFromFavorite = async (product_id: number, user_id: number) => {
  try {
    const response = await axios.post('http://localhost:3001/removeFromFavorite', {
        product_id: product_id,
        user_id: user_id
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const isInFavorite = async (product_id: number, user_id: number) => {
  try {
    const response = await axios.post('http://localhost:3001/isInFavorite', {
        product_id: product_id,
        user_id: user_id
    });
    return response;
  } catch (error) {
    throw error
  }
};