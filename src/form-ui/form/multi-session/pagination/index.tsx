import { FC, useEffect, useState } from "react";
import { Flex, Pagination, PaginationProps, Row, Space } from "antd";
import { FormBuilderProps } from "../../../../form-builder/formBuilder";
import { useFormsDispatch, useFormsState } from "../../../../form-context";
import { setSession } from "../../../../form-context/form.actions";
import { SubmitHandler, FieldValues } from "../../../../form-controller";
import { MasterForm } from "../..";

type PaginationPositon = "left" | "center" |"right";

export interface PaginationFormProps {
    formId: string;
    schema: any;
    onChange?: (current: number, pageSize: number) => void;
    onSubmit: SubmitHandler<FieldValues>;
    paginationProps?: PaginationProps;
    position?: PaginationPositon
}

type PaginationType = PaginationFormProps & FormBuilderProps;

const PaginationForm: FC<PaginationType> = ({
    formId,
    extraValidation,
    componentDidMount,
    componentDidUpdate,
    componentWillUnMount,
    defaultValues,
    dictionary,
    schema,
    onChange,
    onSubmit,
    position,
    paginationProps,
}) => {
    const dispatch = useFormsDispatch();
    const state = useFormsState() as any;
    const [current, setCurrent] = useState(1);
    const pageSize = 1;
    const total = schema.sessionsById.length;
    
    useEffect(() => {
        const currentSessionIndex = state[formId]?.currentSessionIndex + 1;
        if (currentSessionIndex) {
            setCurrent(currentSessionIndex);
        }
    }, [state[formId]?.currentSessionIndex]);

    const onChangeCallBack = (page: number) => {
        dispatch(setSession(formId, page - 1));

        setCurrent(page);

        if (onChange) {
            onChange(page, pageSize);
        }
    };

    const paginationUI = <Row style={{width:"100%", justifyContent: position }}>
        <Pagination {...paginationProps} current={current} pageSize={pageSize} total={total} onChange={onChangeCallBack} />
    </Row>

    return (
        <>
            <Row style={{ width: "100%" }}>
                <MasterForm
                    extraValidation={extraValidation}
                    componentDidUpdate={componentDidUpdate}
                    defaultValues={defaultValues}
                    componentDidMount={componentDidMount}
                    componentWillUnMount={componentWillUnMount}
                    dictionary={dictionary}
                    formId={formId}
                    schema={schema}
                    onSubmit={onSubmit}
                />
                
            </Row>
           {paginationUI}
        </>
    );
};

PaginationForm.defaultProps = {
    paginationProps: {},
    position: "right"
};

export default PaginationForm;