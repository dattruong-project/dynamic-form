import { useEffect } from 'react';
import { ErrorOption, FieldErrors, FieldValues, Ref, UseControllerReturn, UseFormReturn, useFormContext } from '../../form-controller';
import { Layout } from '../../form-ui/component/general';
import { Dictionary, Validations } from '../types';

export type FormFieldProps = {
  id: string;
  fieldType: string;
  disabledField?: boolean;
  mess?: string;
  dictionary: Dictionary;
  validation?: Validations;
  error?: ErrorOption;
  errors?: FieldErrors<FieldValues>;
  propRef?: Ref;
  onClick?: (event: any) => void;
  formId?: string;
  label?: string;
  data?: any;
  control?: UseControllerReturn;
  componentDidMount?: (formContext?: UseFormReturn) => void;
  componentWillUnMount?: (formContext?: UseFormReturn) => void;
  componentDidUpdate?: (formContext?: UseFormReturn) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  fieldType,
  data,
  error,
  formId,
  dictionary,
  ...props
}) => {
  const context = useFormContext();

  useEffect(() => {
    if (props.componentDidMount) {
      props.componentDidMount();
    }

    return () => {
      if (props.componentWillUnMount) {
        props.componentWillUnMount();
      }
    };
  }, []); 

  useEffect(() => {
    if (props.componentDidUpdate) {
      props.componentDidUpdate();
    }
  }, [context.getValues(id)]);

  const Field = dictionary[fieldType];

  if (!Field) return null;

  return (
    <Layout error={error}>
      <Field data-testid={id} id={id} type={fieldType} {...props} />
    </Layout>
  );
};

