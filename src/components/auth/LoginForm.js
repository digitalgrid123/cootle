import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  FormProvider,
  RHFPasswordInput,
  RHFSwitchInput,
  RHFTextInput,
} from "../shared/hook-form";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";

const formSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(12, "Password must be at most 12 characters"),
  })
  .strict();

const LoginForm = ({ selectedRole = "", OTPSent }) => {
  // Form Config
  const defaultValues = {
    email: "",
    password: "",
  };

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { push } = useRouter();
  const { login } = useAuth();
  const { toaster } = useToaster();

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  // Handlers
  const onSend = async ({ email, password }) => {
    try {
      const res = await login(email, password, selectedRole);

      if (res.status) {
        toaster(TOAST_ALERTS.OTP_SENT_SUCCESS, TOAST_TYPES.SUCCESS);
        OTPSent(email);
      }
    } catch (error) {
      toaster("Something went wrong while logging in", TOAST_TYPES.ERROR);
    }
  };

  const onForgot = () => {
    push(PATH_AUTH.forgotPassword);
  };

  return (
    <div className="form-body">
      <FormProvider
        methods={methods}
        className="row g-3"
        onSubmit={handleSubmit(onSend)}
      >
        <div className="col-12">
          <RHFTextInput
            focus={true}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            id="inputEmailAddress"
            type="email"
          />
        </div>
        <div className="col-12">
          <RHFPasswordInput
            name="password"
            label="Password"
            id="inputChoosePassword"
            placeholder="Enter Password"
          />
        </div>
        {/* <div className="col-md-6">
          <RHFSwitchInput
            name="isRememberMe"
            label="Remember Me"
            id="flexSwitchCheckChecked"
          />
        </div> */}
        <div className="col-md-12  d-flex justify-content-end">
          <button
            className="link-primary btn btn-sm"
            onClick={onForgot}
            type="button"
          >
            Forgot Password ?
          </button>
        </div>
        <div className="col-12">
          <div className="d-grid">
            <Button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Sending...." : "Send OTP"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
