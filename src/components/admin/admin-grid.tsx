import { Card, Col, Container, Row } from "react-bootstrap";
import { BagFill, PersonFill } from "react-bootstrap-icons";
import "../../styles/admin-grid.css"; // Import a separate CSS file for styling

const AdminGrid = () => {
  const handleChoice = (choice: string) => {
    window.location.href = choice;
  };

  const options = [
    { name: "Users", link: "/admin/users", icon: <PersonFill /> },
    { name: "Products", link: "/products", icon: <BagFill /> },
  ];

  return (
    <>
      <Container className="p-3">
        <h2 className="text-center mb-4">Welcome Admin User</h2>
        <Row className="justify-content-center">
          {options.map((option, index) => (
            <Col
              xs="auto"
              className="p-1"
              key={index}
            >
              <Card
                onClick={() => handleChoice(option.link)}
                className="text-center admin-options"
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title>{option.icon}</Card.Title>
                  <Card.Text>{option.name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AdminGrid;
