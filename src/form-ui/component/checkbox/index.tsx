import { Checkbox, CheckboxProps } from "antd";
import { useState } from "react";
import { FormFieldProps } from "../../../form-builder";

interface CheckBoxComponentProps {
    onChange: (value: any) => void;
    options: [];
    error: any;
    defaultValue: any;
}

type CheckBoxType = FormFieldProps & CheckBoxComponentProps & CheckboxProps;

const CheckBoxComponent: React.FC<CheckBoxType> = (props) => {
    const {
        id,
        value,
        options,
        disabledField,
        defaultValue,
        onChange,
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
                onChange={handleChange}
                disabled={disabledField}
            />
    );
};

export default CheckBoxComponent;