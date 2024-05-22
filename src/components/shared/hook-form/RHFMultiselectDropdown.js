import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

const RHFMultiselectDropdown = ({
  focus,
  setSelectedOptions,
  selectedOptions,
  name,
  label,
  id,
  placeholder,
  options,
  ...other
}) => {
  const { control } = useForm();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    // Check if the option is already selected
    const isOptionSelected = selectedOptions.some(
      (selectedOption) => selectedOption.id === option.id
    );

    // If the option is not selected, add it to the selectedOptions array
    if (!isOptionSelected) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );
    setSelectedOptions(updatedOptions);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {label && (
            <Form.Label htmlFor={id} className="form-label">
              {label}
            </Form.Label>
          )}
          <div className="input-group" onClick={toggleDropdown}>
            <FormControl
              {...(focus ? { autoFocus: true } : {})}
              type="text"
              id={id}
              placeholder={placeholder}
              onClick={() => setIsOpen(!isOpen)}
              readOnly
              {...field}
            />
            <Button className="border-0 btn btn-light" onClick={toggleDropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </Button>
          </div>

          {isOpen && (
            <div className="dropdown-options">
              {options?.map((option) => (
                <div
                  key={option?.id}
                  onClick={() => handleOptionClick(option)}
                  className={
                    selectedOptions.some(
                      (selectedOption) => selectedOption.id === option.id
                    )
                      ? "disabled-option"
                      : ""
                  }
                >
                  {option?.name}
                </div>
              ))}
            </div>
          )}

          <div className="selected-options">
            {selectedOptions.map((option) => (
              <div
                key={option?.id}
                className="selected-option d-flex  align-align-items-center "
              >
                {option?.name}
                <span onClick={() => handleRemoveOption(option)}>
                  <svg
                    style={{ fill: "GrayText" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      {...other}
    />
  );
};

export default RHFMultiselectDropdown;
