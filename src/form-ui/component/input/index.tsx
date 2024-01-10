import React from "react";
import { Input, InputProps } from "antd";
import { FormFieldProps } from "../../../form-builder/components";

interface InputComponentProps {
  value: any;
  id: string;
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  disabledField: boolean;
  placeholder: string;
  error: any;
}

type InputType = FormFieldProps & InputProps & InputComponentProps;

const InputComponent: React.FC<InputType> = ({
  value,
  type,
  onChange,
  onBlur,
  disabledField,
  placeholder,
  isValidating,
  propRef,
  prefix,
  ...rest
}) => {

  return (
        <Input
          {...rest}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabledField}
          prefix={prefix}
          placeholder={placeholder}
        />
  );
};

export default InputComponent;
