import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
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

const formSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required("Code is required")
      .trim("Enter valid code")
      .min(6, "Code must be 6 characters")
      .max(6, "Code must be 6 characters"),
    password: yup
      .string()
      .required("New Password is required")
      .min(8, "New Password must be at least 8 characters")
      .max(12, "New Password must be at most 12 characters")
      .matches(
        /^(?=.*[A-Za-z0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/,
        "Password must contain at least one alphanumeric character and one of the following symbols: @ $ ! % * ? &"
      ),

    confirm_password: yup
      .string()
      .required("Confirm Password is required")
      .oneOf(
        [yup.ref("password"), null],
        "Password must be same as new password"
      ),
  })
  .strict(true);

export default function EnterNewPassword() {
  // Form Config
  const defaultValues = {
    code: "",
    password: "",
    confirm_password: "",
  };

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { ForgotPassword } = useAuth();
  const { push } = useRouter();
  const { toaster } = useToaster();

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = methods;

  // Handlers
  const onSubmit = async ({ code, password, confirm_password }) => {
    try {
      const res = await ForgotPassword(code, password, confirm_password);
      if (!res.status) {
        reset();
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster(TOAST_ALERTS.PASSWORD_RESET_SUCCESS, TOAST_TYPES.SUCCESS);
        push(PATH_AUTH.login);
        reset();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <>
      <div className="card-body p-sm-5">
        <div className="p-3">
          <div className="text-center">
            <img src="assets/images/forgot-2.png" width="100" alt="" />
          </div>
          <h4 className="mt-5 font-weight-bold">Reset Password</h4>
          <p className="text-muted">
            Enter the code sent to your email along with your new password to
            reset password.
          </p>
          <div className="my-4">
            <FormProvider
              methods={methods}
              className="row g-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-12">
                <RHFTextInput
                  name="code"
                  label="OTP"
                  placeholder="Enter 6 digit OTP"
                  id="code"
                  type="text"
                />
              </div>
              <div className="col-12">
                <RHFPasswordInput
                  name="password"
                  label="New Password"
                  id="inputNewPassword"
                  placeholder="Enter new Password"
                />
              </div>
              <div className="col-12">
                <RHFPasswordInput
                  name="confirm_password"
                  label="Confirm New Password"
                  id="inputChoosePassword"
                  placeholder="Enter confirm Password"
                />
              </div>
              <div className="col-12">
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting ? "Submitting..." : "Reset Password"}
                  </button>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}
