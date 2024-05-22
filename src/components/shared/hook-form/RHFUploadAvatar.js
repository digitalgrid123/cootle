import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";
// import UploadAvatar from "../upload/UploadAvatar";

const RHFUploadAvatar = ({ name, id, helperText, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Group
            controlId="avatar"
            className="d-flex flex-column align-items-center gap-3 justify-content-center"
          >
            <label htmlFor="avatar" className="circle-input">
              <input
                type="file"
                accept="image/*"
                id="avatar"
                name={name}
                className="visually-hidden"
                onChange={({ target }) => field.onChange(target.files[0])}
                {...other}
              />
              <div className="circle-overlay">
                <i className="bx bx-camera camera-icon"></i>
              </div>
              {field.value && (
                <img
                  src={
                    typeof field.value === "string"
                      ? field.value
                      : URL.createObjectURL(field.value)
                  }
                  alt="Avatar"
                  className="avatar"
                />
              )}
            </label>
            {helperText}
            {error ? (
              <Form.Text id={id} className="text-danger">
                {error ? error?.message : ""}
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
        );
      }}
    />
  );
};

export default RHFUploadAvatar;

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
};
