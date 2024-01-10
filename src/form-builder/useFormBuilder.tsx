import { DefaultValues, FieldValues, ValidationMode, useForm } from "../form-controller";

interface FormBuilderOptions {
  defaultValues?: DefaultValues<FieldValues>;
  behavior?: keyof ValidationMode;
}

export const useFormBuilder = ({ defaultValues, behavior }: FormBuilderOptions = {}) => {
  return useForm<FieldValues>({
    mode: behavior || 'all',
    criteriaMode: 'all',
    defaultValues,
  });
};
