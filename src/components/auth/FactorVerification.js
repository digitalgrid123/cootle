import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth, useToaster } from "@/hooks";

const TOAST_ALERTS = {
  GENERAL_ERROR: "An error occurred. Please try again.",
  LOGIN_SUCCESS: "Login successful.",
};

const TOAST_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
};

const formSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required("Code is required")
      .trim("Enter valid code")
      .min(4, "Code must be 4 characters")
      .max(4, "Code must be 4 characters"),
  })
  .strict(true);

const FactorVerification = ({ next }) => {
  // Form Config
  const defaultValues = {
    code: "",
  };

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { VerifyEmail } = useAuth();
  const { toaster } = useToaster();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [otp, setOtp] = useState("");

  const handleConfirm = async () => {
    try {
      const res = await VerifyEmail(otp);

      if (res.status) {
        toaster("Email verified successfully!", TOAST_TYPES.SUCCESS);
        next();
      } else {
        toaster("Code is Incorrect!", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const isOtpComplete = otp.length === 4;

  return (
    <div className="factor-verification-container">
      <OtpInput
        shouldAutoFocus
        value={otp}
        onChange={setOtp}
        numInputs={4}
        isInputNum
        separator={<span>-</span>}
        containerStyle="otp-container"
        inputStyle="otp-input"
        renderInput={(props) => <input {...props} />}
      />
      <div className="col-12">
        <div className="d-grid mt-4">
          <Button
            className="btn btn-primary"
            type="submit"
            onClick={handleConfirm}
            disabled={!isOtpComplete || isSubmitting}
          >
            {isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FactorVerification;
