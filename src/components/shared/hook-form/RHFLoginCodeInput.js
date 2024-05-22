import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

RHFLoginCodeInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default function RHFLoginCodeInput({
  name,
  id = "loginCode",
  placeholder = "Paste log in code",
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
            {...(focus ? { autoFocus: true } : {})}
            type="text"
            id={id}
            placeholder={placeholder}
            className="verify-email"
            disabled={disabled}
            isInvalid={!!error}
            {...field}
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
