import { Radio, RadioProps } from "antd";
import React, { useState } from "react";
import { FormFieldProps } from "../../../form-builder";
import { useFormContext } from "../../../form-controller";

interface RadioComponentProps {
    id: string;
    onChange: (value: any) => void;
    onBlur: (value: any) => void;
    defaultValue: any
}

type RadioType = RadioComponentProps & FormFieldProps & RadioProps;

const RadioComponent: React.FC<RadioType> = ({ id, value, onChange, onBlur, propRef, defaultValue,
    disabledField,...rest }) => {

    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const context = useFormContext();

    const handleChange = (radio) => {
        const updatedOptions = [...value];
        const optionValue = radio.target.value;
        const updatedOptionsWithSelection = updatedOptions.map((option) => ({
            ...option,
            selected: radio.target.value === option.value,
        }));
        setSelectedValue(optionValue);
        // context.setValue(id)
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