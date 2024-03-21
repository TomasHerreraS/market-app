import axios, { AxiosRequestConfig } from 'axios';
import { UserData, Email, SignInData } from '../type';
import { Users } from '../utils/type';

export const sendEmail = async (data: Email) => {
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

export const addUser = async (data: UserData) => {
  try {
    const response = await axios.post('http://localhost:3001/addUser', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const response = await axios.post('http://localhost:3001/signIn', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRole = async (email: Email) => {
  try {
    const response = await axios.post('http://localhost:3001/getRole', email);
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

export const getAllUsers = async (): Promise<Users[]> => {
  try {
    const response = await axios.get<Users[]>('http://localhost:3001/getAllUsers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserId = async (email: Email) => {
  try {
    const response = await axios.post('http://localhost:3001/getUserId', email);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCheckExists = async (phone: string, email: string) => {
  try {
    const response = await axios.post('http://localhost:3001/getCheckExists', {
      phone: phone,
      email: email
  })
    return response.data
  } catch (error) {
    throw error;
  }
}

export const deleteUser = async (email: string) => {
  try {
    const response = await axios.post('http://localhost:3001/deleteUser', {
      email: email
    })
  } catch (error) {
    throw error
  }
}