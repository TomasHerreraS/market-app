import { Card, Image, Placeholder, Row, Col, Stack } from "react-bootstrap";
import "../../styles/favorites-cards.css";

const FavoriteSkeleton = () => {
  return (
    <Card className="my-1 favorites-card">
      <Row className="g-0">
        <Col xs="auto">
          <Placeholder.Button bg="secondary" className="skeleton-image" as={Image} animation="wave"/>
        </Col>
        <Col className="p-2 d-flex flex-column">
          <Stack direction="horizontal" className="justify-content-between">
            <Placeholder as="p" animation="wave" xs={4}>
              <Placeholder xs={12} size="xs" />
            </Placeholder>
            <Placeholder.Button
              className="skeleton-button"
              animation="wave"
              size="lg"
              bg="secondary"
            />
          </Stack>
          <Placeholder xs={6} as={Card.Text} animation="wave">
            <Placeholder xs={8} size="lg" />
            <Placeholder xs={12} size="lg" />
            <Placeholder xs={8} size="lg" />
          </Placeholder>
          <Stack
            direction="horizontal"
            className="justify-content-between mt-auto"
          >
            <Placeholder as={Card.Text} xs={3} animation="wave">
              <Placeholder xs={12} size="sm" />
            </Placeholder>
            <Placeholder animation="wave" xs={5}  sm={5} md={4} lg={2}>
              <Placeholder.Button className="skeleton-button" xs={12} bg="info" size="lg" />
            </Placeholder>
          </Stack>
        </Col>
      </Row>
    </Card>
  );
};

export default FavoriteSkeleton;
