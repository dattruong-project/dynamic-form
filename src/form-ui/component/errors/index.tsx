import React from "react";
import { FC } from "react";
import { FieldErrors } from "../../../form-controller";
import { ErrorMessage } from "../general";

export type MultiErrorsProps = {
  errors?: FieldErrors;
};

const MultiErrorsComponent: FC<MultiErrorsProps> = ({ errors }) => {
  return (
    <>
      {errors && (
        <>
          {Object.values(errors).map((err, index) => (
            <React.Fragment key={index}>
              <ErrorMessage>{err?.message?.toString()}</ErrorMessage>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default MultiErrorsComponent;