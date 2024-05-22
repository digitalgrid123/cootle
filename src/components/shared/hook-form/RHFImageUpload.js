import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

RHFImageUpload.propTypes = {
  name: PropTypes.string,
};

export default function RHFImageUpload({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Form.Group controlId={name}>
            <Form.Label>Upload Logo of Hospital</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                field.onChange(e);
                // Additional logic, if needed, can be added here
              }}
            />
            <Form.Text className="text-danger">
              {error ? error?.message : ""}
            </Form.Text>
          </Form.Group>

          {field.value && (
            <div>
              <p>Uploaded Image:</p>
              <img
                src={URL.createObjectURL(field.value)}
                alt="Uploaded"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}

          <Button
            variant="primary"
            onClick={() => {
              "Upload Logic:", field.value;
            }}
          >
            Upload
          </Button>
        </>
      )}
      {...other}
    />
  );
}
