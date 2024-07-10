import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

const AddMappingModal = ({
  show,
  handleClose,
  defaultDesignEfforts,
  handleSave,
  mappingType,
}) => {
  // Initialize state
  const [newMapping, setNewMapping] = useState({
    title: "",
    description: "",
    type: mappingType || "",
    design_efforts: [],
  });

  // Effect to update type when mappingType changes
  useEffect(() => {
    setNewMapping((prevState) => ({
      ...prevState,
      type: mappingType || "",
    }));
  }, [mappingType]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMapping((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for design efforts selection
  const handleDesignEffortsChange = (selectedOptions) => {
    const selectedEfforts = selectedOptions.map((option) => option.value); // Use .value to map selected options correctly
    setNewMapping((prevState) => ({
      ...prevState,
      design_efforts: selectedEfforts,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(newMapping);
    setNewMapping({
      title: "",
      description: "",
      type: mappingType || "",
      design_efforts: [],
    });
    handleClose();
  };

  // Map defaultDesignEfforts to options for react-select
  const designEffortsOptions = defaultDesignEfforts.map((effort) => ({
    value: effort.title,
    label: effort.title,
  }));

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
          {/* <Form.Group controlId="formMappingType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={newMapping.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="VAL">Value Mapping</option>
              <option value="OUT">Product Outcomes</option>
              <option value="OBJ">Objective Mapping</option>
            </Form.Control>
          </Form.Group> */}
          <Form.Group controlId="formMappingDesignEfforts">
            <Form.Label>Design Efforts</Form.Label>
            <Select
              value={designEffortsOptions.filter((option) =>
                newMapping.design_efforts.includes(option.value)
              )}
              options={designEffortsOptions}
              onChange={handleDesignEffortsChange}
              isMulti
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

export default AddMappingModal;
