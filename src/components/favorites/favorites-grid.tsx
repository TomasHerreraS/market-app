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
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDataAfterInterval = async () => {
      try {
        const productsData = await fetchProducts();
        setAllProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    // Set up a timeout to trigger the data fetch after 1 second
    const fetchTimeoutId = setTimeout(fetchDataAfterInterval, 1000);

    // Clear the timeout when the component unmounts
    return () => {
      clearTimeout(fetchTimeoutId);
    };
  }, []);

  useEffect(() => {
    setFavoriteProducts(getFavoriteProducts(allProducts));
  }, [updateFavorites, allProducts]);

  const handleDeleteFavorite = (id: number) => {
    removeFromFavorites(id);
    setUpdateFavorites((prev) => !prev);
  };

  return (
    <Container className="favorites-container">
          <h2 className="favorites-title">
            My Favorites
            <span className="items-text">
              ({favoriteProducts.length} items)
            </span>
          </h2>
      {isLoading ? (
          <FavoriteSkeleton />
      ) : (
          favoriteProducts.map((obj) => (
            <FavoritesCards
              key={obj.product_id}
              obj={obj}
              onDelete={handleDeleteFavorite}
            />
          ))
      )}
    </Container>
  );
};

export default FavoritesGrid;
