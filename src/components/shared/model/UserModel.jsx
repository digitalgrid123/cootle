import React from "react";
import { RHFUsernameInput } from "../hook-form";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";

const formSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
});

const UserModel = ({ setShowPopup, showPopup, setUserName, next }) => {
  const { updateuser, setuseradd } = useAuth();
  const { toaster } = useToaster();
  const defaultValues = {
    fullname: "",
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

  const handleNameSubmit = async (data, event) => {
    event.preventDefault();

    const fullName = data.fullname.trim();
    if (fullName && !fullName.startsWith("User#")) {
      try {
        const res = await updateuser(data.fullname);

        if (!res.status) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
          setuseradd(true);
        } else {
          toaster(res.message, TOAST_TYPES.SUCCESS);
          next();
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
    }
  };

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Hey there! Welcome to Cootle. </h2>
            <p className="username-note">
              We need your name to get started. <br /> We promise, no autographs
              required!{" "}
              <img src="/assets/images/mark/simple-pen.png" alt="simple-pen" />
              <img src="/assets/images/mark/smily.png" alt="smily" />
            </p>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleNameSubmit)}>
                <RHFUsernameInput
                  name="fullname"
                  placeholder="Your names here, pls?"
                  focus={true}
                />
                <button
                  className="submit-btn"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  <span>Continue</span>
                </button>
              </form>
            </FormProvider>

            <p>You are currently logged in as yusuf@cootle.com </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModel;
