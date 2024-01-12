import React, { useState } from "react";
import { AutoComplete, InputProps } from "antd";
import { FormFieldProps } from "../../../form-builder";

interface AutocompleteInputProps {
  data: any;
  id: string;
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  placeholder: string;
  defaultValue: any;
}

type AutocompleteInputType =  InputProps & AutocompleteInputProps & FormFieldProps;

const AutoCompleteComponent: React.FC<AutocompleteInputType> = ({
  data,
  defaultValue,
  id,
  onChange,
  onBlur,
  disabledField,
  placeholder,
  prefix,
  ...rest
}) => {

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (selectValue) => {
    const updatedOptions = [...data];
    const optionValue = selectValue;
    const updatedOptionsWithSelection = updatedOptions.map((option) => ({
      ...option,
      selected: selectValue === option.value,
    }));
    setSelectedValue(optionValue);
    onChange(updatedOptionsWithSelection);
  };

  return (
    <AutoComplete
      {...rest}
      style={{ width: "100%" }}
      id={id}
      disabled={disabledField}
      value={selectedValue}
      onChange={handleChange}
      onBlur={onBlur}
      filterOption={(inputValue, option: any) => {
        return option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
      }}
      placeholder={placeholder}
      options={data}
    />
  );
};

export default AutoCompleteComponent;