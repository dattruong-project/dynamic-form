import * as React from 'react';

import { Dictionary, ExtraValidation, FormSchema } from './types';
import { useAutoFocus } from './hooks/useAutoFocus.hook';
import { getSchemaInfo } from './utils/getSchemaInfo.util';
import { Stepper } from './components/stepper.component';
import { FormField } from './components/formField.component';
import { SubmitField } from './components/submitField.component';

import { filterDependentsFieldsById } from './utils/conditionalFields.utils';
import { FieldRules, getFieldRules } from './utils/validation.utils';
import { SubmitHandler, FieldValues, DefaultValues, ValidationMode, useForm, FormProvider, Controller } from '../form-controller';

const EMPTY_OBJECT = {} as const;
const NOOP = () => null;

export interface FormBuilderProps {
  formId: string;
  schema: FormSchema;
  dictionary: Dictionary;
  onSubmit: SubmitHandler<FieldValues>;
  onNextSession?: (value: any) => void;
  defaultValues?: DefaultValues<FieldValues>;
  behavior?: keyof ValidationMode;
  extraValidation?: ExtraValidation;
  isLastSession?: boolean;
  currentSessionIndex?: number;
  formProps?: { [key: string]: unknown };
  debug?: boolean;
  componentWillUnMount?: Function;
  componentDidMount?: Function;
  componentDidUpdate?: Function;
}

export function FormBuilder({
  formId,
  schema,
  dictionary,
  onSubmit,
  onNextSession = NOOP,
  extraValidation,
  defaultValues,
  behavior = 'all',
  isLastSession = true,
  componentWillUnMount = NOOP,
  componentDidMount = NOOP,
  componentDidUpdate = NOOP,
  currentSessionIndex = 0,
  formProps = EMPTY_OBJECT
}: FormBuilderProps) {

  const typesAllowed = React.useMemo(() => Object.keys(dictionary || EMPTY_OBJECT), [dictionary]);

  const { fields, fieldsById, sessionsById, submitLabel, hiddenButton } = React.useMemo(
    () => getSchemaInfo(schema, typesAllowed, currentSessionIndex),
    [currentSessionIndex, schema, typesAllowed],
  );

  const context = useForm<FieldValues>({
    mode: behavior,
    criteriaMode: 'all',
    defaultValues: defaultValues
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    control,
    getValues,
    watch,
    setFocus,
  } = context;

  const getFieldValidationRules = (fieldId) => {
    const field = fields?.[fieldId];

    if (!field || !field.validation) {
      return {};
    }

    return {
      [fieldId]: getFieldRules({ validation: field.validation, extraValidation, watch }),
    };
  };

  const validationRulesById = React.useMemo(
    () =>
      fieldsById.reduce((accumulator, fieldId) => {
        return {
          ...accumulator,
          ...getFieldValidationRules(fieldId),
        };
      }, {} as { [key: string]: FieldRules }),
    [extraValidation, fields, fieldsById, watch]
  );

  React.useEffect(() => {
    componentDidMount(context);

    return (() => {
      componentWillUnMount(context);
    })
  }, []);

  React.useEffect(() => {
    componentDidUpdate(context);
  }, [context.formState.defaultValues]);

  const filteredFields = filterDependentsFieldsById({
    fieldsById,
    fields,
    getValues,
    errors,
    extraValidation,
  });

  const isFormSessionValid = !isValid || isSubmitting;

  useAutoFocus({ currentSessionIndex, schema, setFocus });

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <>
      <FormProvider {...context}>
        <form
          data-testid="form-builder"
          aria-labelledby="form-label-element-id"
          onKeyDown={(e) => checkKeyDown(e)}
          {...formProps}
          onSubmit={handleSubmit(onSubmit)}>
            <Stepper currentSessionIndex={currentSessionIndex}>
            
            {sessionsById?.map((sessionId) => (
              <React.Fragment key={sessionId}>
                {filteredFields?.map((fieldId) => {
                  const { type, id, disabledField, meta, validation, data, componentDidMount, componentDidUpdate, componentWillUnMount } = fields?.[fieldId];
                  return (
                    <Controller
                      key={id}
                      name={id}
                      control={control}
                      defaultValue={data}
                      rules={validationRulesById[fieldId]}
                      render={({ field }) => {
                        const { ref, ...fieldRest } = field;
                        return (
                          <FormField
                            id={id}
                            formId={formId}
                            data={data}
                            disabledField={disabledField}
                            fieldType={type}
                            validation={validation}
                            dictionary={dictionary}
                            error={errors?.[id]}
                            errors={errors}
                            propRef={ref}
                            componentDidMount={() => componentDidMount && componentDidMount(context)}
                            componentDidUpdate={() => componentDidUpdate && componentDidUpdate(context)}
                            componentWillUnMount={() => componentWillUnMount && componentWillUnMount(context)}
                            {...meta}
                            {...fieldRest}
                          />
                        );
                      }}
                    />
                  );
               })}
              </React.Fragment>
            ))}
          </Stepper>
            {!hiddenButton && (
              <SubmitField
                formId={formId}
                dictionary={dictionary}
                submitDisabled={isFormSessionValid}
                nextDisabled={isFormSessionValid}
                isLastSession={isLastSession}
                submitLabel={submitLabel}
                getValues={getValues}
                onNextSession={onNextSession}
              />
            )}
        </form>
      </FormProvider>
    </>
  );
}