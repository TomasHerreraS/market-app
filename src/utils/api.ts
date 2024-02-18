import { Products, Users } from "./type";
import productsData from '../data/products.json';
import users from '../data/users.json';

// Product API
// Once the database is setup this needs to be fixed using async and await
export const fetchProducts = async (): Promise<Products[]> => {
  return new Promise((resolve) => {
    resolve(productsData as unknown as Products[]);
  });
};

// Users API
export const fetchUsers = async (): Promise<Users[]> => {
    return new Promise((resolve) => {
      resolve(users as unknown as Users[])
    });
};


