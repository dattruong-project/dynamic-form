import React from "react";
import { Input, InputProps } from "antd";

interface InputComponentProps {
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  placeholder: string;
}

type InputType = InputProps & InputComponentProps;

const InputComponent: React.FC<InputType> = ({
  value,
  type,
  onChange,
  onBlur,
  disabled,
  placeholder,
  prefix,
  ...rest
}) => {
  
  return (
        <Input
          {...rest}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          prefix={prefix}
          placeholder={placeholder}
        />
  );
};

export default InputComponent;
