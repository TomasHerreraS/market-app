import { Container } from "react-bootstrap";
import FavoritesCards from "./favorites-cards";
import { Products } from "../../utils/type";
import "../../styles/favorites-grid.css";
import React, { useState, useEffect } from "react";
import {
  getFavoriteProducts,
  removeFromFavorites,
} from "../../utils/favorites";
import FavoriteSkeleton from "./favorite-skeleton";
import { fetchProducts } from "../../utils/api";

const FavoritesGrid: React.FC = () => {
  const [updateFavorites, setUpdateFavorites] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<Products[]>([]);
  const [allProducts, setAllProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts(); // Assuming fetchProducts is an async function that fetches your products
        setAllProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []); // Fetch products when the component mounts

  useEffect(() => {
    setFavoriteProducts(getFavoriteProducts(allProducts));
  }, [updateFavorites, allProducts]);

  const handleDeleteFavorite = (id: number) => {
    removeFromFavorites(id);
    setUpdateFavorites((prev) => !prev);
  };

  return (
    <Container className="favorites-container">
      <FavoriteSkeleton />
      <h2 className="favorites-title">
        My Favorites{" "}
        <span className="items-text">({favoriteProducts.length} items)</span>
      </h2>
      {favoriteProducts.map((product) => (
        <FavoritesCards
          key={product.id}
          product={product}
          onDelete={handleDeleteFavorite}
        />
      ))}
    </Container>
  );
};

export default FavoritesGrid;
