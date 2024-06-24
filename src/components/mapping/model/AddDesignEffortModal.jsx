// AddDesignEffortModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddDesignEffortModal = ({
  show,
  handleClose,
  categories,
  handleSave,
}) => {
  const [newDesignEffort, setNewDesignEffort] = useState({
    title: "",
    category: categories.length > 0 ? categories[0].name : "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDesignEffort((prevDesignEffort) => ({
      ...prevDesignEffort,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(newDesignEffort);
    setNewDesignEffort({
      title: "",
      category: categories.length > 0 ? categories[0].name : "",
      description: "",
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Design Effort</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newDesignEffort.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={newDesignEffort.category}
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
              value={newDesignEffort.description}
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

export default AddDesignEffortModal;
