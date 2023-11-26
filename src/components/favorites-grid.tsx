import { Container } from "react-bootstrap";
import { products } from "./products";
import FavoritesCards from "./favorites-cards";
import "../styles/favorites-grid.css";
import React, { useState } from "react";
import { getFavoriteProducts, removeFromFavorites } from "../utils/favorites";

const FavoritesGrid: React.FC = () => {
  const [updateFavorites, setUpdateFavorites] = useState(false);
  const favoriteProducts = getFavoriteProducts(products);

  const handleDeleteFavorite = (id: number) => {
    removeFromFavorites(id);
    setUpdateFavorites(prev => !prev);
  };

  return (
    <Container className="favorites-container">
      <h2 className="favorites-title">
        My Favorites <span className="items-text">({favoriteProducts.length} items)</span>
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
