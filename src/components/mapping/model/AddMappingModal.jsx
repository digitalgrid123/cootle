import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddMappingModal = ({
  show,
  handleClose,
  defaultDesignEfforts,
  handleSave,
}) => {
  const [newMapping, setNewMapping] = useState({
    title: "",
    description: "",
    type: "", // Initialize type with an empty string
    design_efforts: [],
  });

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "design_efforts") {
      const selectedValues = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setNewMapping((prevMapping) => ({
        ...prevMapping,
        [name]: selectedValues,
      }));
    } else {
      setNewMapping((prevMapping) => ({
        ...prevMapping,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(newMapping);
    // Reset form fields after submission
    setNewMapping({
      title: "",
      description: "",
      type: "",
      design_efforts: [],
    });
  };

  // Hardcoded options for the Type dropdown
  const typeOptions = ["VAL", "OUT", "OBJ"];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Mapping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMappingTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newMapping.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMappingDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newMapping.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMappingType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={newMapping.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMappingDesignEfforts">
            <Form.Label>Design Efforts</Form.Label>
            <Form.Control
              as="select"
              name="design_efforts"
              value={newMapping.design_efforts}
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

export default AddMappingModal;
