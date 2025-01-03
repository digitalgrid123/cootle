import React, { useEffect } from "react";
import { RHFUsernameInput } from "../hook-form";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import { toggleBodyScroll } from "@/utils/scrollUtils";

const formSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
});

const UserModel = ({
  setShowPopup,
  showPopup,

  next,
  selectedCompany,
}) => {
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
        } else {
          toaster(res.message, TOAST_TYPES.SUCCESS);
          if (selectedCompany) {
            setShowPopup(false);
          }
          setuseradd(res);
          next(); // Move to the next tab
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
    }
  };
  useEffect(() => {
    toggleBodyScroll(showPopup);
  }, [showPopup]);

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content weight-700">
            <h2>Hey there! Welcome to Cootle. </h2>
            <p className="username-note weight-400">
              We need your name to get started. <br /> We promise, no autographs
              required!
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
                  <span className="weight-500">Continue</span>
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModel;
