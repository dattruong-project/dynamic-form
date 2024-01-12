import { Select, SelectProps } from "antd";
import { CSSProperties } from "styled-components";
import React, { useState } from "react";
import { FormFieldProps } from "../../../form-builder";

interface SelectComponentProps {
    value: any;
    onChange: (value: any) => void;
    onBlur: (value: any) => void;
    selectStyle?: CSSProperties;
    defaultOptions: any
}

type SelectType = SelectComponentProps & FormFieldProps & SelectProps;

const SelectComponent: React.FC<SelectType> = ({ id, value, disabled, defaultOptions, onChange, onBlur, selectStyle,
    error,
    propRef,
    disabledField,
    ...rest }) => {

    const [defaultValue, setDefault] = useState(defaultOptions);

    const handleChange = (selectValue) => {
        const updatedOptions = [...value];
        const optionValue = selectValue;
        const updatedOptionsWithSelection = updatedOptions.map((option) => ({
            ...option,
            selected: selectValue === option.value,
        }));
        setDefault(optionValue);
        onChange(updatedOptionsWithSelection);
    };

    return (
            <Select
                {...rest}
                disabled={disabledField}
                style={selectStyle}
                value={defaultValue}
                onChange={handleChange}
                onBlur={onBlur}
                options={value}
            />
    );
}

export default SelectComponent;