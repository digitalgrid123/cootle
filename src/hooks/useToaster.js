import { toast } from "react-toastify";

const useToaster = () => {
  // VARIANT success, info, error, warn
  const toaster = (message, variant) => {
    toast[variant](message);
  };

  return { toaster };
};

export default useToaster;
