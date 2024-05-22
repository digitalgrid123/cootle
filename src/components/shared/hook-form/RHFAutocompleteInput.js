import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller, useFormContext } from "react-hook-form";

RHFAutocompleteInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFAutocompleteInput({
  name,
  id,
  options = [],
  label = "",
  placeholder = "",
  ...other
}) {
  if (!Array.isArray(options)) {
    console.error("Options prop must be an array");
    options = [];
  }

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
          <Typeahead
            id={id}
            labelKey="label"
            options={options}
            placeholder={placeholder}
            selected={field.value}
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
