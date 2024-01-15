import { useState } from "react";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import "../../styles/users-grid.css";
import DeleteButton from "../buttons/delete-button";

const UsersGrid = () => {
  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className={showForm ? "darken" : ""}></div>
      <Container className="p-3 m-5 mx-auto user-list">
            <h3 className="text-center mb-4">List of Users</h3>
        <Row className="mb-4">
          <Col xs={9} md={11}>
            <InputGroup size="sm">
              <Button variant="info">Search</Button>
              <Form.Control
              placeholder="What user are you looking for?"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Col>
          <Col xs={3} md={1} className="d-flex justify-content-end">
            <Button size="sm" variant="info" onClick={() => handleForm()}>
              Add User
            </Button>
          </Col>
        </Row>
        <hr />

        <Card className="p-2 m-1">
          <Stack direction="horizontal" className="justify-content-between">
            <h5>User 1</h5>
            <DeleteButton onDelete={() => console.log("Delete User")} />
          </Stack>
          <div>
            <p>Username: quantum123</p>
            <p>Email: quantum123@quantum.com</p>
            <p>Address: Quantum Ave W</p>
            <p>Account Type: Client</p>
          </div>
        </Card>
        <Card className="p-2 m-1">
          <Stack direction="horizontal" className="justify-content-between">
            <h5>User 2</h5>
            <DeleteButton onDelete={() => console.log("Delete User")} />
          </Stack>
          <div>
            <p>Username: quantum123</p>
            <p>Email: quantum123@quantum.com</p>
            <p>Address: Quantum Ave W</p>
            <p>Account Type: Admin</p>
          </div>
        </Card>
      </Container>
      {showForm ? (
        <>
          <Container className="add-users">
            <Stack direction="horizontal" className="justify-content-end">
              <CloseButton onClick={() => handleForm()} />
            </Stack>
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="name@quantum.com"
            />
            <Form.Text id="email" muted></Form.Text>
            <br />
            <Form.Label>Username:</Form.Label>
            <Form.Control type="name" id="name" placeholder="quantum123" />
            <Form.Text id="name" muted>
              Username must be atleast 6 characters long.
            </Form.Text>
            <br />
            <Form.Label htmlFor="inputPassword5" className="mt-4">
              Password:
            </Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </Form.Text>
            <Col className="d-flex justify-content-center mt-5">
              <Button variant="info">Add User</Button>
            </Col>
          </Container>
        </>
      ) : null}
    </>
  );
};

export default UsersGrid;
