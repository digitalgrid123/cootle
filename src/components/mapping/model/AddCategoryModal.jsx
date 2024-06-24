// AddCategoryModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCategoryModal = ({ show, handleClose, handleSave }) => {
  const [newCategory, setNewCategory] = useState({ name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(newCategory);
    setNewCategory({ name: "" });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryModal;
