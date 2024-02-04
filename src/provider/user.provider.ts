import axios from 'axios';
import { userData, email, signInData } from '../type';

export const sendEmail = async (data: email) => {
  try {
    const response = await axios.post('http://localhost:3001/sendEmail', data);
    return response;
  } catch (error) {
    throw error;
  }
}

export const verificationCode = async (data: string) => {
  try {
    const response = await axios.post('http://localhost:3001/verificationCode', data);
    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteGlobalNumber = async () => {
  try {
    const response = await axios.post('http://localhost:3001/deleteGlobalNumber');
    return response;
  } catch (error) {
    throw error;
  }
}

export const addUser = async (data: userData) => {
  try {
    const response = await axios.post('http://localhost:3001/addUser', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (data: signInData) => {
  try {
    const response = await axios.post('http://localhost:3001/signIn', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmailLoggedIn = async (email: email) => {
  try {
    const response = await axios.post('http://localhost:3001/getEmailLoggedIn', email);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUniques = async () => {
  try {
    const response = await axios.get('http://localhost:3001/getUniques');
    return response;
  } catch (error) {
    throw error;
  }
};