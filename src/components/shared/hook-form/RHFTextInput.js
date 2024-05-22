import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFTextInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextInput({
  name,
  id,
  focus,
  label = "",
  placeholder = "",
  type = "text",
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
          <Form.Control
            {...(focus ? { autoFocus: true } : {})}
            type={type}
            id={id}
            aria-describedby={id}
            className="form-control"
            placeholder={placeholder}
            disabled={disabled}
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
