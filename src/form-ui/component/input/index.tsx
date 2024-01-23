import React from "react";
import { Input, InputProps } from "antd";
import { FormFieldProps } from "../../../form-builder";

interface InputComponentProps {
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  placeholder: string;
}

type InputType = InputProps & InputComponentProps & FormFieldProps;

const InputComponent: React.FC<InputType> = ({
  value,
  type,
  onChange,
  onBlur,
  disabledField,
  placeholder,
  prefix,
  propRef,
  componentDidMount,
  componentDidUpdate,
  componentWillUnMount,
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
