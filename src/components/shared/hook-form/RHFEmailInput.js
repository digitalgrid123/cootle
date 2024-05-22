import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

RHFEmailInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default function RHFEmailInput({
  name,
  id = "email",
  placeholder = "Enter your email address",
  focus = false,
  disabled = false,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-100">
          <Form.Control
            {...field}
            type="email"
            id={id}
            placeholder={placeholder}
            className="verify-email"
            disabled={disabled}
            isInvalid={!!error}
            {...(focus ? { autoFocus: true } : {})}
          />
          {error && (
            <Form.Text className="text-danger yup-text">
              {error.message}
            </Form.Text>
          )}
        </div>
      )}
      {...other}
    />
  );
}
