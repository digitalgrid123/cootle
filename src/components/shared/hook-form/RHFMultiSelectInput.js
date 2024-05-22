import PropTypes from "prop-types";
import { Col, Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFMultiSelectInput.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default function RHFMultiSelectInput({
  name,
  children,
  id,
  label = "",
  disabled = false,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Group as={Col} controlId="my_multiselect_field">
          {label ? (
            <Form.Label htmlFor={id} className="form-label">
              {label}
            </Form.Label>
          ) : (
            ""
          )}
          <Form.Control
            as="select"
            multiple
            // id={id}
            id="multiple-select-field"
            isInvalid={!!error}
            disabled={disabled}
            className="form-select mb-0"
            {...field}
            onChange={() => {}}
          >
            {children}
          </Form.Control>
          <Form.Text id={id} className="text-danger">
            {error ? error?.message : ""}
          </Form.Text>
        </Form.Group>
      )}
      {...other}
    />
  );
}

// setField([].slice.call(e.target.selectedOptions).map(item => item.value))
