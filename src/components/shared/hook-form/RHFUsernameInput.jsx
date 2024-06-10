import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

RHFUsernameInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default function RHFUsernameInput({
  name,
  id = "username",
  placeholder = "Enter your username",
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
            type="text"
            id={id}
            placeholder={placeholder}
            className="verify-username f-16 weight-500"
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
