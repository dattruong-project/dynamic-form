import React, { useState } from "react";
import { AutoComplete, InputProps } from "antd";
import { FormFieldProps } from "../../../form-builder";

interface AutocompleteInputProps {
  value: any;
  id: string;
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  disabledField: boolean;
  placeholder: string;
  error: any;
  defaultValue: any;
}

type AutocompleteInputType = FormFieldProps & InputProps & AutocompleteInputProps;

const AutoCompleteComponent: React.FC<AutocompleteInputType> = ({
  value,
  defaultValue,
  id,
  onChange,
  onBlur,
  disabledField,
  placeholder,
  error,
  isValidating,
  propRef,
  data,
  prefix,
  ...rest
}) => {

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (selectValue) => {
    const updatedOptions = [...value];
    const optionValue = selectValue;
    const updatedOptionsWithSelection = updatedOptions.map((option) => ({
      ...option,
      selected: selectValue === option.value,
    }));
    setSelectedValue(optionValue);
    onChange(updatedOptionsWithSelection);
  };

  console.log(value);
  return (
    <AutoComplete
      {...rest}
      style={{ width: "100%" }}
      id={id}
      value={selectedValue}
      onChange={handleChange}
      onBlur={onBlur}
      filterOption={(inputValue, option: any) => {
        return option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
      }}
      disabled={disabledField}
      placeholder={placeholder}
      options={value}
    />
  );
};

export default AutoCompleteComponent;