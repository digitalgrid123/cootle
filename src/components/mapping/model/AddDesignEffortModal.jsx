import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddDesignEffortModal = ({
  show,
  handleClose,
  categories,
  handleSave,
  activeCategory, // Receive active category state
}) => {
  const [newDesignEffort, setNewDesignEffort] = useState({
    title: "",
    category: activeCategory, // Initialize category with activeCategory
    description: "",
  });

  // Reset form fields when activeCategory changes
  useEffect(() => {
    setNewDesignEffort((prevDesignEffort) => ({
      ...prevDesignEffort,
      category: activeCategory,
    }));
  }, [activeCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDesignEffort((prevDesignEffort) => ({
      ...prevDesignEffort,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(newDesignEffort)?.then((success) => {
      if (success) {
        setNewDesignEffort({
          title: "",
          category: activeCategory,
          description: "",
        });
        handleClose(); // Close modal after saving
      }
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
          {/* <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={newDesignEffort.category}
              onChange={handleChange}
            >
              {categories?.map((category) => (
                <option key={category.name} value={category.name}>
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
