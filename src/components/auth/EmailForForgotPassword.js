import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormProvider, RHFTextInput } from "../shared/hook-form";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import { Button } from "react-bootstrap";

const formSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter valid email address"),
  })
  .strict();

export default function EmailForForgotPassword({ OTPSent }) {
  const defaultValues = {
    email: "",
  };

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { push } = useRouter();
  const { ForgotPasswordOTP } = useAuth();
  const { toaster } = useToaster();

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  // Handlers
  const onSend = async ({ email }) => {
    try {
      const res = await ForgotPasswordOTP(email);
      if (!res.status) {
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster(TOAST_ALERTS.OTP_SENT_SUCCESS, TOAST_TYPES.SUCCESS);
        OTPSent(email);
      }
    } catch (error) {
      toaster("hello", TOAST_TYPES.ERROR);
    }
  };

  const onBack = () => {
    push(PATH_AUTH.login);
  };
  return (
    <>
      <div className="card-body ">
        <div className="p-3">
          {/* <div className="text-center">
            <img src="assets/images/forgot-2.png" width="100" alt="" />
          </div> */}
          <h2 className="mt-5 ">Forgot Password</h2>
          <p className="text-muted">
            Enter the email you registered with your Vision Surgery AI account,
            later you will be receive an email.
          </p>
          <div className="my-4">
            <FormProvider
              methods={methods}
              className="row g-3"
              onSubmit={handleSubmit(onSend)}
            >
              <RHFTextInput
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
                id="inputEmailAddress"
                type="email"
              />

              <Button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? "Sending...." : "Send OTP"}
              </Button>
              {/* <button
                  className="btn btn-light"
                  type="button"
                  onClick={onBack}
                >
                  <i className="bx bx-arrow-back me-1"></i>Back to Login
                </button> */}
              <div className="d-flex justify-content-end mt-4">
                <p>
                  Back to
                  <a
                    href="#"
                    onClick={onBack}
                    className="ms-1 fw-bold text-decoration-none text-dark"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}
