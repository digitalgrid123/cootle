import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditMappingModal = ({
  show,
  handleClose,
  mapping,
  handleChange,
  handleSave,
  defaultDesignEfforts,
}) => {
  // Modified typeOptions with label and value
  const typeOptions = [
    { label: "Value Mapping", value: "VAL" },
    { label: "Product Outcomes", value: "OUT" },
    { label: "Objective Mapping", value: "OBJ" },
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Mapping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMappingTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={mapping.title || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMappingDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={mapping.description || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMappingType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={mapping.type || ""}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              {typeOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMappingDesignEfforts">
            <Form.Label>Design Efforts</Form.Label>
            <Form.Control
              as="select"
              name="design_efforts"
              value={mapping.design_efforts || []}
              onChange={handleChange}
              multiple
            >
              {defaultDesignEfforts.map((effort, index) => (
                <option key={index} value={effort.title}>
                  {effort.title}
                </option>
              ))}
            </Form.Control>
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
};

export default EditMappingModal;
