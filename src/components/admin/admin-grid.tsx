import { Card, Col, Container, Row } from "react-bootstrap";
import { BagFill, Person } from "react-bootstrap-icons";
import "../../styles/admin-grid.css"; // Import a separate CSS file for styling

const AdminGrid = () => {

const handleChoice = (choice: string) => {
  window.location.href = choice;
}

  return (
    <>
      <Container>
        <h2 className="text-center">Welcome Admin User</h2>
        <Row>
          <Col xs={6} className="d-flex align-items-center justify-content-center">
            <Card onClick={() => handleChoice("/admin/users")} className="text-center admin-options">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title><Person /></Card.Title>
                <Card.Text>Users</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <Card onClick={() => handleChoice("/products")} className="text-center admin-options">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title><BagFill /></Card.Title>
                <Card.Text>Products</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminGrid;
