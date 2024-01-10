import { Radio, RadioProps } from "antd";
import React, { useState } from "react";
import { CSSProperties } from "styled-components";
import { FormFieldProps } from "../../../form-builder";

interface RadioComponentProps {
    onChange: (value: any) => void;
    onBlur: (value: any) => void;
    defaultValue: any,
    error: any
}

type RadioType = RadioComponentProps & FormFieldProps & RadioProps;

const RadioComponent: React.FC<RadioType> = ({ value, onChange, onBlur, disabledField, defaultValue,
    isValidating,
    propRef,
    ...rest }) => {

    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleChange = (radio) => {
        const updatedOptions = [...value];
        const optionValue = radio.target.value;
        const updatedOptionsWithSelection = updatedOptions.map((option) => ({
            ...option,
            selected: radio.target.value === option.value,
        }));
        setSelectedValue(optionValue);
        onChange(updatedOptionsWithSelection);
    };

    return (
            <Radio.Group
                {...rest}
                disabled={disabledField}
                defaultValue={selectedValue}
                options={value}
                onChange={handleChange}
            />
    );
}

export default RadioComponent;