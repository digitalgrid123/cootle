import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";
import { useToggle } from "@/hooks";

RHFPasswordInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFPasswordInput({
  name,
  id,
  label = "",
  placeholder = "",
  ...other
}) {
  const { toggle, onToggle } = useToggle(false);

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
          <div className="input-group" id="show_hide_password">
            <Form.Control
              type={toggle ? "text" : "password"}
              id={id}
              aria-describedby={id}
              className="form-control border-end-0"
              placeholder={placeholder}
              {...field}
            />
            <a
              className="input-group-text bg-transparent"
              href="#"
              onClick={onToggle}
            >
              <i className={`bx bx-${toggle ? "show" : "hide"}`}></i>
            </a>
          </div>
          <Form.Text id={id} className="text-danger">
            {error ? error?.message : ""}
          </Form.Text>
        </>
      )}
      {...other}
    />
  );
}
