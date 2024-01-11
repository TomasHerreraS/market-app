import { useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "../../styles/heart-button.css";
import {
  addToFavorites,
  isProductInFavorites,
  removeFromFavorites,
} from "../../utils/favorites";

const HeartButton = ({ productId }: { productId: number }) => {
  const [isLiked, setLike] = useState(isProductInFavorites(productId));

  const toggleLike = () => {
    setLike(!isLiked);

    // Add a function to add and remove the product from the wishlist
    if (isLiked) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }

    setLike(!isLiked);
  };

  if (isLiked)
    return (
      <HeartFill className="heart-button heart-fill" onClick={toggleLike} />
    );
  return <Heart className="heart-button" onClick={toggleLike} />;
};

export default HeartButton;
