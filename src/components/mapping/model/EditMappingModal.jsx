import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

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

  // Handle change in Quill editor
  const handleEditorChange = (value) => {
    handleChange({
      target: {
        name: "description",
        value,
      },
    });
  };

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
            <ReactQuill
              value={mapping.description}
              onChange={handleEditorChange}
              modules={EditMappingModal.modules}
              formats={EditMappingModal.formats}
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

// Quill editor modules and formats (optional customization)
EditMappingModal.modules = {
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

EditMappingModal.formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "align",
  "link",
];

export default EditMappingModal;
