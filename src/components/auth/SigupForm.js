import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  FormProvider,
  RHFPasswordInput,
  RHFTextInput,
} from "../shared/hook-form";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import { useRouter } from "next/navigation";

const formSchema = yup
  .object()
  .shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter valid email address"),
    phone: yup.string().required("Phone Number is required"),
    createpassword: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(12, "Password must be at most 12 characters"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("createpassword"), null], "Passwords must match"),
  })
  .strict();

const SignupForm = ({
  selectedRole = "",
  OTPSent,
  next,
  setUserEmail,
  inviteInUrl,
  email,
}) => {
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: email || "", // Use provided email or an empty string
    phone: "",
    createpassword: "",
    confirmpassword: "",
  };

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const { push } = useRouter();
  const { signup, hospitalInvite } = useAuth();
  const { toaster } = useToaster();

  const onSend = async ({
    firstname,
    lastname,
    phone,
    email,
    createpassword,
    confirmpassword,
  }) => {
    try {
      let res;

      if (inviteInUrl) {
        res = await hospitalInvite(
          firstname,
          lastname,
          phone,
          email,
          createpassword,
          confirmpassword
        );
      } else {
        res = await signup(
          firstname,
          lastname,
          phone,
          email,
          createpassword,
          confirmpassword,
          selectedRole
        );
      }

      if (!res.status) {
        const errorMessage = res.message.join(", "); // Join error messages
        return toaster(errorMessage, TOAST_TYPES.ERROR);
      }

      if (res.status) {
        toaster(res.data, TOAST_TYPES.SUCCESS);
        setUserEmail(email);
        next();
      }
    } catch (error) {
      toaster(
        error.response?.data?.message || "An error occurred. Please try again.",
        TOAST_TYPES.ERROR
      );
    }
  };

  return (
    <div className="form-body">
      <FormProvider
        methods={methods}
        className="row g-3"
        onSubmit={handleSubmit(onSend)}
      >
        <div className="col-6">
          <RHFTextInput
            focus={true}
            name="firstname"
            label="First Name"
            placeholder="Enter your first name"
            id="inputFirstName"
            type="text"
          />
        </div>
        <div className="col-6">
          <RHFTextInput
            name="lastname"
            label="Last Name"
            placeholder="Enter your last name"
            id="inputLastName"
            type="text"
          />
        </div>
        <div className="col-12">
          <RHFTextInput
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            id="inputEmailAddress"
            type="email"
            disabled={email ? true : false}
          />
        </div>
        <div className="col-12">
          <RHFTextInput
            type="tel"
            placeholder="+1"
            name="phone"
            label="Phone Number"
            id="inputPhoneNumber"
            value="+1234567890"
          />
        </div>
        <div className="col-12">
          <RHFPasswordInput
            name="createpassword"
            label="Create Password"
            id="inputCreatePassword"
            placeholder="Enter your Password"
          />
        </div>
        <div className="col-12">
          <RHFPasswordInput
            name="confirmpassword"
            label="Confirm Password"
            id="inputConfirmPassword"
            placeholder="Confirm your Password"
          />
        </div>
        <div className="col-12">
          <div className="d-grid">
            <Button
              className="btn btn-primary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Sending...." : "Sign Up"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default SignupForm;
