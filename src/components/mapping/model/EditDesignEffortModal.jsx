import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditDesignEffortModal = ({
  show,
  handleClose,
  designEffort,
  handleChange,
  categories,
  handleSave,
  activeCategory, // Receive active category state
}) => {
  const [editedDesignEffort, setEditedDesignEffort] = useState({
    ...designEffort,
  });

  useEffect(() => {
    setEditedDesignEffort({ ...designEffort });
  }, [designEffort]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
    handleClose(); // Close modal after saving
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Design Effort</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedDesignEffort.title}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={editedDesignEffort.category}
              onChange={handleChange}
            >
              {categories?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedDesignEffort.description}
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

export default EditDesignEffortModal;
