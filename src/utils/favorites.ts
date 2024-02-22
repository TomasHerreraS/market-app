import { Products } from "./type";

const FAVORITE_PRODUCTS_KEY = 'favoriteProductIds';

export const getFavoriteProductIds = (): number[] => {
  const storedProductIds = localStorage.getItem(FAVORITE_PRODUCTS_KEY);
  return storedProductIds ? JSON.parse(storedProductIds) : [];
};

export const setFavoriteProductIds = (productIds: number[]): void => {
  localStorage.setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify(productIds));
};

export const addToFavorites = (productId: number): void => {
  const favoriteProductIds = getFavoriteProductIds();
  if (!favoriteProductIds.includes(productId)) {
    const updatedFavorites = [...favoriteProductIds, productId];
    setFavoriteProductIds(updatedFavorites);
  }
};

export const removeFromFavorites = (productId: number): void => {
  const favoriteProductIds = getFavoriteProductIds();
  const updatedFavorites = favoriteProductIds.filter(id => id !== productId);
  setFavoriteProductIds(updatedFavorites);
};

export const isProductInFavorites = (productId: number): boolean => {
  const favoriteProductIds = getFavoriteProductIds();
  return favoriteProductIds.includes(productId);
};

export const getFavoriteProducts = (allProducts: Products[]): Products[] => {
  const favoriteProductIds = getFavoriteProductIds();
  return allProducts.filter(product => favoriteProductIds.includes(product.product_id));
};

// Initialize the key with an empty array if it doesn't exist
const initializeLocalStorage = (): void => {
  const storedProductIds = localStorage.getItem(FAVORITE_PRODUCTS_KEY);
  if (!storedProductIds) {
    setFavoriteProductIds([]);
  }
};

// Run the initialization when the file is loaded
initializeLocalStorage();
