import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFSwitchInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFSwitchInput({ name, id, label = "", ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id={id}
              name={name}
              {...field}
            />
            <label className="form-check-label" htmlFor={id}>
              {label}
            </label>
          </div>
          <Form.Text id={id} className="text-danger">
            {error ? error : ""}
          </Form.Text>
        </>
      )}
      {...other}
    />
  );
}
