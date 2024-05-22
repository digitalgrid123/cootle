import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import RHFEmailInput from "../shared/hook-form/RHFEmailInput";
import FormHeading from "./FormHeading";
import { usePathname } from "next/navigation";
import { PATH_AUTH } from "@/routes/paths";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
});

const VerifyEmail = ({ setUserEmail, next }) => {
  const pathname = usePathname();
  const defaultValues = {
    email: "",
  };

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Hooks
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = (data) => {
    console.log("Email submitted:", data.email);
    setUserEmail(data.email);
    next();
    // Handle form submission logic here
  };

  return (
    <div className="verify-box">
      <FormHeading
        title={`${pathname === PATH_AUTH.login ? "Log in" : "Get started"}`}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 mt-40">
          <RHFEmailInput name="email" />
          <button
            className="submit-btn"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            <span>Continue with email</span>
          </button>
        </form>
      </FormProvider>
      <div>
        <p className="note">
          By clicking “Continue with Email”, you agree to the Cootle{" "}
          <a href="#" className="hover-underline">
            TOS
          </a>{" "}
          and{" "}
          <a href="#" className="hover-underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
