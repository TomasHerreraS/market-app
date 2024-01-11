import { Card, Placeholder, Image, ButtonGroup, Stack } from "react-bootstrap";
import "../../styles/product-cards-skeleton.css";

const ProductSkeleton = () => {
  return (
    <Card className="product-card">
      <Placeholder.Button
        bg="secondary"
        className="product-skeleton-image"
        as={Image}
        animation="wave"
      />
        <Placeholder as={Card.Title} animation="wave" xs={6} className="mt-4">
            <Placeholder xs={12} />
        </Placeholder>
        <Placeholder as={Card.Text} xs={10} animation="wave">
        <Placeholder xs={6}/>{''}<Placeholder xs={4} />
        <Placeholder xs={3}/>{''}<Placeholder xs={6} />
        <Placeholder xs={12}/>
        </Placeholder>
        <Placeholder as={Card.Text} xs={12} animation="wave">
            <Placeholder xs={3}/>
        </Placeholder>
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between">
        <Placeholder.Button variant="info" xs={5}/>
        <Placeholder.Button variant="danger" xs={1}/>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ProductSkeleton;
