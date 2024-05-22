import PropTypes from "prop-types";
import { FormProvider as RHFFormProvider, useForm } from "react-hook-form";

const FormProvider = ({ children, onSubmit, methods, className = "" }) => {
  return (
    <RHFFormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </RHFFormProvider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

export default FormProvider;
