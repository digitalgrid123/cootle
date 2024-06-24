// EditDesignEffortModal.js
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditDesignEffortModal = ({
  show,
  handleClose,
  designEffort,
  handleChange,
  handleSave,
  categories,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Design Effort</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={designEffort.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={designEffort.category}
            onChange={handleChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={designEffort.description}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EditDesignEffortModal;
