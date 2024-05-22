import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormProvider, RHFTextInput } from "../shared/hook-form";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";

const formSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required("Code is required")
      .trim("Enter valid code")
      .min(6, "Code must be 6 characters")
      .max(6, "Code must be 6 characters"),
  })
  .strict(true);

const VerifyOTP = () => {
  // Form Config
  const defaultValues = {
    code: "",
  };

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { verifyCode } = useAuth();
  const { toaster } = useToaster();

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  // Handlers
  const onSubmit = async ({ code }) => {
    try {
      const res = await verifyCode(code);

      if (!res.status) {
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster(TOAST_ALERTS.LOGIN_SUCCESS, TOAST_TYPES.SUCCESS);
        reset();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <div className="form-body">
      <FormProvider
        methods={methods}
        className="row g-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-12">
          <RHFTextInput
            focus={true}
            name="code"
            label="OTP"
            placeholder="Enter 6 digit OTP"
            id="code"
            type="text"
          />
        </div>
        <div className="col-12">
          <div className="d-grid">
            <Button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying...." : "Submit"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default VerifyOTP;
