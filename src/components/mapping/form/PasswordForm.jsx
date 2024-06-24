import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

const PasswordForm = ({ password, setPassword, handlePasswordSubmit }) => (
  <Container
    className="d-flex align-items-center justify-content-center"
    style={{ height: "100vh" }}
  >
    <Card style={{ maxWidth: "400px", width: "100%" }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Enter Password</Card.Title>
        <Form onSubmit={handlePasswordSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
);

export default PasswordForm;
