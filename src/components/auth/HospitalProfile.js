import React, { useState, useEffect } from "react";
import {
  FormProvider,
  RHFTextInput,
  RHFSingleInput,
  RHFProfile,
} from "../shared/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";

const formSchema = yup.object().shape({
  hospitalname: yup.string().required("Hospital Name is required"),

  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone Number is required"),
  postalcode: yup.string().required("Postal Code is required"),
});

const HospitalProfile = ({ next }) => {
  const states = [
    { value: "alabama", label: "Alabama" },
    { value: "alaska", label: "Alaska" },
    { value: "arizona", label: "Arizona" },
    // ... (Include all 50 states)
  ];

  const Cities = [
    { value: "new-york", label: "New York City" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    // ... (Include more cities)
  ];

  const defaultValues = {
    hospitalname: "",
    state: "",
    city: "",
    address: "",
    phone: "",
    postalcode: "",
    logo: null,
  };

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { addHospital } = useAuth();
  const { toaster } = useToaster();

  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting, isValid } = formState;

  const onSubmit = async (formData) => {
    try {
      const {
        hospitalname,
        state: { value: selectedState },
        city: { value: selectedCity },
        address,
        phone,
        postalcode,
        logo,
      } = formData;

      const res = await addHospital({
        name: hospitalname,
        state: selectedState,
        city: selectedCity,
        address,
        phone,
        zipcode: postalcode,
        logo,
      });

      if (!res.status) {
        return toaster(TOAST_ALERTS.HOSPITAL_FIELDS, TOAST_TYPES.ERROR);
      }

      if (res.status) {
        toaster(TOAST_ALERTS.HOSPITAL_CREATE_SUCCESS, TOAST_TYPES.SUCCESS);
        reset();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.HOSPITAL_FIELDS, TOAST_TYPES.ERROR);
    }
  };

  return (
    <div className="form-body">
      <FormProvider
        methods={methods}
        className="row g-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <RHFProfile
          name="logo"
          id="logo"
          helperText="Upload Logo of Hospital"
          rules={{ required: "Avatar is required" }}
        />

        <div className="col-12">
          <RHFTextInput
            focus={true}
            name="hospitalname"
            label="Hospital Name"
            placeholder="Enter name of the hospital"
            id="inputhospitalname"
            type="text"
          />
        </div>
        <div className="col-12">
          <RHFSingleInput
            name="state"
            label="State"
            options={states}
            placeholder="Select state"
            id="selectstate"
            disabled={false}
          />
        </div>
        <div className="col-12">
          <RHFSingleInput
            name="city"
            label="City"
            options={Cities}
            placeholder="Select city"
            id="selectcity"
            disabled={false}
          />
        </div>
        <div className="col-12">
          <RHFTextInput
            name="address"
            label="Address"
            placeholder="Enter address here"
            id="inputAddress"
            type="text"
          />
        </div>
        <div className="col-12">
          <RHFTextInput
            type="tel"
            placeholder="+1"
            name="phone"
            label="Enter phone Number"
            id="inputPhoneNumber"
          />
        </div>
        <div className="col-12">
          <RHFTextInput
            name="postalcode"
            label="Zip/Postal Code"
            placeholder="Enter zip/postal code"
            id="inputzipcode"
            type="text"
          />
        </div>
        <div className="col-12">
          <div className="d-grid">
            <Button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Sending...." : "Create Profile"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default HospitalProfile;
