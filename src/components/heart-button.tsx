import { useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "../styles/heart-button.css"


const HeartButton = () => {
        const [isLiked, setLike] = useState(false);
        
        const toggleLike = () => {
            setLike(!isLiked)

            // Add a function to add and remove the product from the wishlist
            isLiked === true ? console.log('Removed from wishlist') : console.log('Added to wishlist')
        }
    
    if (isLiked) return <HeartFill className="heart-button heart-fill" onClick={toggleLike}/>
    return <Heart className="heart-button" onClick={toggleLike} />
   
};

export default HeartButton;

