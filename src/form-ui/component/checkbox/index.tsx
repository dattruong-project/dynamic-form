import { Checkbox, CheckboxProps } from "antd";
import { useState } from "react";
import { FormFieldProps } from "../../../form-builder";

interface CheckBoxComponentProps {
    onChange: (value: any) => void;
    options: [];
    error: any;
    defaultValue: any;
}

type CheckBoxType = CheckBoxComponentProps & FormFieldProps & CheckboxProps;

const CheckBoxComponent: React.FC<CheckBoxType> = (props) => {
    const {
        id,
        value,
        options,
        disabledField,
        defaultValue,
        onChange,
        setValue,
        getValues,
        isValidating,
        propRef,
        ...rest
    } = props;

    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleChange = (checkbox) => {
        const updatedOptions = [...value];
        const updatedOptionsWithSelection = updatedOptions.map((option) => ({
            ...option,
            selected: checkbox.includes(option.value),
        }));
        setSelectedValue(updatedOptionsWithSelection);
        onChange(updatedOptionsWithSelection);
    };

    return (
            <Checkbox.Group
                {...rest}
                defaultValue={selectedValue}
                options={value}
                disabled={disabledField}
                onChange={handleChange}
            />
    );
};

export default CheckBoxComponent;