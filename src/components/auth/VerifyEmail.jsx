import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import RHFEmailInput from "../shared/hook-form/RHFEmailInput";
import FormHeading from "./FormHeading";
import { usePathname } from "next/navigation"; // Remove useSearchParams from import
import { PATH_AUTH } from "@/routes/paths";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
});

const VerifyEmail = ({ setUserEmail, next }) => {
  const pathname = usePathname();
  const { register, login, acceptuser } = useAuth();
  const { toaster } = useToaster();
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    // Use token as needed
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      let res;
      const authFunction = pathname === PATH_AUTH.login ? login : register;
      res = await authFunction(data.email);

      if (!res.status) {
        return toaster(res.message, TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster(res.message, TOAST_TYPES.SUCCESS);
        setUserEmail(data.email);
        next();
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
          <RHFEmailInput name="email" />
          <button
            className="submit-btn"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            <span className="weight-500">Continue with email</span>
          </button>
        </form>
      </FormProvider>
      <div>
        <p className="note weight-400">
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
