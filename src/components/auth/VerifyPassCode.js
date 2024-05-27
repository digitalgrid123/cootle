import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import RHFEmailInput from "../shared/hook-form/RHFEmailInput";
import RHFLoginCodeInput from "../shared/hook-form/RHFLoginCodeInput";
import { usePathname } from "next/navigation";
import { PATH_AUTH } from "@/routes/paths";
import FormHeading from "./FormHeading";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";

// Define the form schema using yup
const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
  loginCode: yup
    .string()
    .required("Login code is required")
    .length(6, "Login code must be 6 characters"),
});

const VerifyPassCode = ({ userEmail }) => {
  const pathname = usePathname();
  const { verifyregisterCode, userloginverify } = useAuth();
  const { toaster } = useToaster();
  // Default values for the form
  const defaultValues = {
    email: userEmail || "",
    loginCode: "",
  };

  // Initialize the form methods using useForm from react-hook-form
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  // Function to handle form submission
  const onSubmit = async (data) => {
    event.preventDefault();
    try {
      const authFunction =
        pathname === PATH_AUTH.login ? userloginverify : verifyregisterCode;
      const res = await authFunction(data.email, data.loginCode);

      if (!res.status) {
        return toaster(res.message, TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster(res.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <div className="verify-box">
      <FormHeading
        title={`${pathname === PATH_AUTH.login ? "Log in" : "Get started"}`}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 mt-40">
          <RHFEmailInput name="email" disabled={!!userEmail} />
          <p className="comic-passdetail">
            We just catapulted a password-pigeon your way! Check your inbox
            before it demands breadcrumbs as a delivery fee.
            <span>
              <img src="/assets/images/mark/pigeon.png" alt="pigeon" />
            </span>
            <span>
              <img src="/assets/images/mark/lock.png" alt="pigeon" />
            </span>
          </p>
          <RHFLoginCodeInput name="loginCode" />
          <button
            className="submit-btn"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            <span>Continue with log in code</span>
          </button>
        </form>
      </FormProvider>
      <div>
        <p className="note">
          By clicking “Continue”, you agree to the Cootle{" "}
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

export default VerifyPassCode;
