import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFSelectInput.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default function RHFSelectInput({
  name,
  children,
  id,
  label = "",
  placeholder = "",
  disabled = false,
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

          <Form.Select
            aria-label={label}
            id={id}
            placeholder={placeholder}
            className="form-select mb-0"
            isInvalid={!!error}
            disabled={disabled}
            {...field}
          >
            {children}
          </Form.Select>
          <Form.Text id={id} className="text-danger">
            {error ? error?.message : ""}
          </Form.Text>
        </>
      )}
      {...other}
    />
  );
}
