import { ErrorOption, FieldErrors, FieldValues, Ref, UseFormGetValues, UseFormReset, UseFormResetField, UseFormSetValue } from '../../form-controller';
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
}

export function FormField({ id, fieldType, data, error, formId, dictionary, ...props }: FormFieldProps) {
  const Field = dictionary[fieldType];
  if (!Field) return null;

  return <Layout error={error} id={id}>
    <Field data-testid={id} id={id} type={fieldType} {...props} />
  </Layout>
}
