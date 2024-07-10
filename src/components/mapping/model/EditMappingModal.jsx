import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

const EditMappingModal = ({
  show,
  handleClose,
  mapping,
  handleChange,
  defaultDesignEfforts,
  handleSave,
}) => {
  const options = defaultDesignEfforts.map((effort) => ({
    value: effort.title, // Assuming title can uniquely identify efforts
    label: effort.title,
  }));

  // Map initial selected values from mapping.design_efforts to react-select options
  const selectedOptions = mapping.design_efforts.map((effortTitle) => ({
    value: effortTitle,
    label: effortTitle,
  }));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Mapping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={mapping.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={mapping.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="designEfforts">
            <Form.Label>Design Efforts</Form.Label>
            <Select
              options={options}
              isMulti
              name="design_efforts"
              value={selectedOptions}
              onChange={(selectedOptions) =>
                handleChange({
                  target: {
                    name: "design_efforts",
                    selectedOptions,
                  },
                })
              }
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
};

export default EditMappingModal;
