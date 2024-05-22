import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

// form
import { Controller, useFormContext } from "react-hook-form";

RHFTimeInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFTimeInput({
  name,
  id,
  label = "",
  placeholder = "",
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
          <input
            type="time"
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
