import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditDesignEffortModal = ({
  show,
  handleClose,
  designEffort,
  handleSave,
  categories,
  activeCategory,
}) => {
  const [editedDesignEffort, setEditedDesignEffort] = useState({
    ...designEffort,
  });

  useEffect(() => {
    setEditedDesignEffort({
      ...designEffort,
      description: designEffort.description.replace(/\\n/g, "\n"), // Convert saved \n to actual line breaks
    });
  }, [designEffort]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedDesignEffort((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert actual line breaks to \n for saving
    const modifiedDesignEffort = {
      ...editedDesignEffort,
      description: editedDesignEffort.description.replace(/\n/g, "\\n"),
    };

    handleSave(modifiedDesignEffort);
    handleClose();
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
