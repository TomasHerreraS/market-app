import { useEffect, useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "../../styles/heart-button.css";
import { getUserId } from "../../provider/user.provider";
import { decodedToken } from "../../utils/token";
import {
  addToFavorite,
  isInFavorite,
  removeFromFavorite,
} from "../../provider/product.provider";

const HeartButton = ({ productId }: { productId: number }) => {
  const [isLiked, setLike] = useState(false);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    const fetchUserId = async () => {
      if (decodedToken) {
        const id = await getUserId({ email: decodedToken.email });
        setUserId(id.user_id);
      }
    };

  fetchUserId();

  }, []);

  useEffect(() => {
    const fetchInFavorite = async () => {
      if(userId) {
        const like = await isInFavorite(productId, userId)
          setLike(like.data);
        }
    };

    fetchInFavorite();

  }, [userId])


  const addFavorite = async () => {
    if (userId) {
      await addToFavorite(productId, userId);
    }
  };

  const removeFavorite = async () => {
    if (userId) {
      await removeFromFavorite(productId, userId);
    }
  };

  const toggleLike = () => {
    if (userId) {
      setLike(!isLiked);
    } else {
      console.log("Login to add to favorite");
    }
  };

  const handleClick = () => {
    toggleLike();

    if (isLiked) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  return isLiked ? (
    <HeartFill className="heart-button heart-fill" onClick={handleClick} />
  ) : (
    <Heart className="heart-button" onClick={handleClick} />
  );
};

export default HeartButton;
