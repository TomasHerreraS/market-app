import axios from 'axios';
import { userData } from '../type';

export const createUser = async(data: userData) => {
    try {
      await axios.post('http://localhost:3001/addUser', data).then((response) => {
        console.log(response.data);
      }, (error) => {
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  }