import { Button } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import '../../styles/product-cards.css'

const AddToCartButton = () => {
  return (
    <Button variant="info">
      <Cart size={20} className="product-icon" />
      &nbsp;Add To Cart
    </Button>
  );
};

export default AddToCartButton;
