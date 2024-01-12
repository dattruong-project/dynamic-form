import { Button } from "antd"
import { ButtonHTMLType } from "antd/es/button"
import { FC, MouseEventHandler } from "react";
import { CSSProperties } from "styled-components"
import { FormFieldProps } from "../../../form-builder";

export interface ButtonProps extends FormFieldProps {
    id: string,
    label: string,
    buttonStyle?: CSSProperties,
    type?: ButtonHTMLType,
    onClick: MouseEventHandler<any> | undefined;
}

const SubmitButton: FC<ButtonProps> = ({ id, label, disabledField, buttonStyle, type = "submit", onClick }) => {

    return <div id={id}>
        <Button id={id} disabled={disabledField} style={buttonStyle} htmlType={type} onClick={onClick}>{label}</Button>
    </div>

}

export default SubmitButton;