import { Products } from "./type";
import productsData from '../data/products.json';

// Product API
// Once the database is setup this needs to be fixed using async and await
export const fetchProducts = async (): Promise<Products[]> => {
  return new Promise((resolve) => {
    resolve(productsData as unknown as Products[]);
  });
};

