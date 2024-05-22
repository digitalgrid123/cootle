import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFTextAreaInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextAreaInput({
  name,
  id,
  label = "",
  placeholder = "",
  rows = 3,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {label ? (
            <Form.Label htmlFor={id} className="form-label">
              {label}
            </Form.Label>
          ) : (
            ""
          )}
          <Form.Control
            as="textarea"
            rows={rows}
            id={id}
            aria-describedby={id}
            className="form-control"
            placeholder={placeholder}
            {...field}
          />
          <Form.Text id={id} className="text-danger">
            {error ? error?.message : ""}
          </Form.Text>
        </>
      )}
      {...other}
    />
  );
}
