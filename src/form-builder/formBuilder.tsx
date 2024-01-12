import * as React from 'react';

import { Dictionary, ExtraValidation, FormSchema } from './types';
import { useAutoFocus } from './hooks/useAutoFocus.hook';
import { getSchemaInfo } from './utils/getSchemaInfo.util';
import { Stepper } from './components/stepper.component';
import { FormField } from './components/formField.component';
import { SubmitField } from './components/submitField.component';

import { filterDependentsFieldsById } from './utils/conditionalFields.utils';
import { useFormsState } from '../form-context/form.context';
import { FieldRules, getFieldRules } from './utils/validation.utils';
import { SubmitHandler, FieldValues, DefaultValues, ValidationMode, useForm, FormProvider, Controller, Noop } from '../form-controller';
import { Col, Flex, Row } from 'antd';

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
  componentDidUpdate?: Function
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

  const { fields, fieldsById, sessionsById, submitLabel, hiddenButton, gutter } = React.useMemo(
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
    reset,
    watch,
    setFocus,
  } = context;

  const state = useFormsState() as any;

  const validationRulesById = React.useMemo(
    () =>
      fieldsById.reduce((accumulator, fieldId) => {
        const validation = fields?.[fieldId]?.validation || EMPTY_OBJECT;
        return {
          ...accumulator,
          [fieldId]: getFieldRules({ validation, extraValidation, watch }),
        };
      }, {} as { [key: string]: FieldRules }),
    [extraValidation, fields, fieldsById, watch],
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

  //Binding Data
  React.useEffect(() => {
    const dataState = state[formId]?.data;
    dataState && reset(dataState, { keepErrors: true });
  }, [state[formId]?.data]);

  //Binding error
  React.useEffect(() => {
    const error = state[formId]?.error;
    error && reset(error, { keepErrors: true });
  }, [state[formId]?.error]);

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
          <Flex style={{ height: "100%", flexDirection: "column" }}>
            <Stepper currentSessionIndex={currentSessionIndex}>
              {sessionsById?.map((stepId) => (
                <Row key={stepId} gutter={gutter}>
                  {filteredFields?.map((fieldId) => {
                    const { type, id, disabledField, meta, validation, data, grid } = fields[fieldId];
                    const { offset, xs, sm, md, lg, flex, xl, xxl } = grid || {};

                    return (
                      <Col style={{width:"100%"}} flex={flex} offset={offset} xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} key={id}>
                        <Controller
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
                                {...meta}
                                {...fieldRest}
                              />
                            );
                          }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              ))}
            </Stepper>

            {!hiddenButton && (
              <Row>
                <Col span={24}>
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
                </Col>

              </Row>
            )}
          </Flex>
        </form>

      </FormProvider>
    </>
  );
}