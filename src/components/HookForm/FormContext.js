import React from "react";
import { FormProvider } from "react-hook-form";

const FormContext = ({ methods, children }) => {
    return <FormProvider {...methods}>{children}</FormProvider>;
};

export default FormContext;
