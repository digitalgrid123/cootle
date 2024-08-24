import dynamic from 'next/dynamic';
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles

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
      description: designEffort.description, // Convert saved \n to actual line breaks
    });
  }, [designEffort]);

  const handleChange = (value) => {
    setEditedDesignEffort((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert actual line breaks to \n for saving
    const modifiedDesignEffort = {
      ...editedDesignEffort,
      description: editedDesignEffort.description,
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
              onChange={(e) =>
                setEditedDesignEffort((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <ReactQuill
              value={editedDesignEffort.description}
              onChange={handleChange}
              modules={EditDesignEffortModal.modules}
              formats={EditDesignEffortModal.formats}
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

EditDesignEffortModal.modules = {
  toolbar: [
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["bold", "italic", "underline"],
    ["link"],
    ["clean"],
  ],
};

EditDesignEffortModal.formats = [
  "header",
  "font",
  "size",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "link",
];

export default EditDesignEffortModal;
