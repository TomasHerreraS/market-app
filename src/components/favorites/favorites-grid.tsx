import { Container } from "react-bootstrap";
import FavoritesCards from "./favorites-cards";
import { Products } from "../../utils/type";
import "../../styles/favorites-grid.css";
import React, { useState, useEffect } from "react";
import FavoriteSkeleton from "./favorite-skeleton";
import { getFavorite } from "../../provider/product.provider";
import { decodedToken } from "../../utils/token";
import { getUserId } from "../../provider/user.provider";

const FavoritesGrid: React.FC = () => {
  const [favorites, setFavorites] = useState<Products[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (decodedToken) {
        try {
          const user_id = await getUserId(decodedToken);
          const favoritesData = await getFavorite(user_id);
          setFavorites(favoritesData);
        } catch (error) {
          console.error("Could Not Fetch Products", error);
        } finally {
          setLoading(false);
        }
      }
    };

    // Set up a timeout to trigger the data fetch after 1 second
    const fetchTimeoutId = setTimeout(fetchData, 1000);

    // Clear the timeout when the component unmounts
    return () => {
      clearTimeout(fetchTimeoutId);
    };
  }, []);

  const handleDeleteFavorite = (id: number) => {};

  return (
    <Container className="favorites-container">
      <h2 className="favorites-title">
        My Favorites
        <span className="items-text">({favorites.length} items)</span>
      </h2>
      {isLoading ? (
        <FavoriteSkeleton />
      ) : (
        favorites.map((obj) => (
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
