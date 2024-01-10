
import { FC, useEffect } from "react";
import { FormBuilder, FormBuilderProps } from "../../../form-builder/formBuilder";
import { useFormsDispatch, useFormsState } from "../../../form-context";
import { initForm, setNextSession } from "../../../form-context/form.actions";
import { LifeCycle } from "../lifeCycle.type";
import { extraValidation } from "../../extra-validation";

type MasterFormType = LifeCycle & FormBuilderProps;

export const MasterForm: FC<MasterFormType> = ({ formId, schema, dictionary, componentWillUnMount, componentDidMount, componentDidUpdate, onSubmit, ...rest }) => {
    const dispatch = useFormsDispatch();
    const state = useFormsState() as any;
    const formState = state[formId];

    useEffect(() => dispatch(initForm(formId, schema)), []);

    return (
        <>
            {formState && (
                <FormBuilder
                    componentDidUpdate={componentDidUpdate}
                    componentDidMount={componentDidMount}
                    componentWillUnMount={componentWillUnMount}
                    currentSessionIndex={formState.currentSessionIndex}
                    isLastSession={formState.isLastSession}
                    formId={formId}
                    schema={schema}
                    onNextSession={() => dispatch(setNextSession(formId))}
                    dictionary={dictionary}
                    onSubmit={onSubmit}
                    {...rest}>
                </FormBuilder>
            )}
        </>
    );
}

MasterForm.defaultProps = {
    extraValidation: extraValidation
}