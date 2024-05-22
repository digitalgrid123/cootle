import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFFileInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFFileInput({
  name,
  id,
  label = "",
  placeholder = "",
  type = "file",
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
            type={type}
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
