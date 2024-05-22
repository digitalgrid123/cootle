// import React from "react";
// import DatePicker from "react-datepicker";
// import PropTypes from "prop-types";
// import { Form } from "react-bootstrap";
// import { Controller, useFormContext } from "react-hook-form";
// import "react-datepicker/dist/react-datepicker.css";

// RHFDateInput.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   dateInputProps: PropTypes.object,
// };

// export default function RHFDateInput({
//   name,
//   id,
//   label = "",
//   placeholder = "",
//   dateInputProps = {},
// }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <div className="d-flex flex-column ">
//           {label && (
//             <Form.Label htmlFor={id} className="form-label">
//               {label}
//             </Form.Label>
//           )}
//           <DatePicker
//             {...field}
//             selected={field.value}
//             placeholderText={placeholder}
//             dateFormat="yyyy-MM-dd HH:mm"
//             showTimeInput
//             timeInputLabel="Time:"
//             id={id}
//             className="form-control"
//             {...dateInputProps}
//           />
//           <Form.Text id={id} className="text-danger">
//             {error ? error?.message : ""}
//           </Form.Text>
//         </div>
//       )}
//     />
//   );
// }
