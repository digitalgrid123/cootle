// import React from "react";
// import PropTypes from "prop-types";
// import { Form, Button } from "react-bootstrap";
// import { Controller, useFormContext } from "react-hook-form";
// import upload from "../../../../public/assets/images/upload.svg";
// import Image from "next/image";

// const RHFProfile = ({ name, id, helperText, ...other }) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => {
//         const hasImage = Boolean(field.value);

//         return (
//           <Form.Group
//             controlId="avatar"
//             className="d-flex align-items-center gap-3 justify-content-start"
//           >
//             <div className="d-flex align-items-center gap-4 justify- ">
//               <label htmlFor="avatar" className="circle-input">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="avatar"
//                   name={name}
//                   className="visually-hidden"
//                   onChange={({ target }) => field.onChange(target.files[0])}
//                   {...other}
//                 />
//                 <div className="circle-overlay">
//                   <i className="bx h4 fw-bold m-0 text-white">+</i>
//                 </div>
//                 {field.value && (
//                   <img
//                     src={
//                       typeof field.value === "string"
//                         ? field.value
//                         : URL.createObjectURL(field.value)
//                     }
//                     alt="Avatar"
//                     className="avatar"
//                   />
//                 )}
//               </label>
//               <div className="d-flex flex-column">
//                 <h6>{helperText}</h6>

//                 <Button
//                   className="mt-2 d-flex  gap-2 justify-content-center align-items-center "
//                   variant="primary"
//                   onClick={() => {
//                     const fileInput = document.getElementById("avatar");
//                     if (hasImage) {
//                       // Remove the image
//                       field.onChange(null);
//                       fileInput.value = null; // Reset the file input
//                     } else {
//                       // Trigger file input click to upload image
//                       fileInput.click();
//                     }
//                   }}
//                 >
//                   {hasImage ? (
//                     "Remove "
//                   ) : (
//                     <>
//                       <Image src={upload} color="text-white" alt="Picture" />
//                       Upload Image
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>

//             {error && (
//               <Form.Text id={id} className="text-danger">
//                 {error ? error?.message : ""}
//               </Form.Text>
//             )}
//           </Form.Group>
//         );
//       }}
//     />
//   );
// };

// RHFProfile.propTypes = {
//   name: PropTypes.string,
// };

// export default RHFProfile;
