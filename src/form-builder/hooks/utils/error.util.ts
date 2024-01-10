import { DirtyFields, FormSchema } from '../../types';
import { DEFAULT_RULES_NAMES } from '../../constants';
import { DefaultValues, FieldErrors, FieldValues } from '../../../form-controller';

export const isFieldInError = ({ fieldToCheck, errors }: { fieldToCheck: string; errors: FieldErrors }) =>
  !!(errors && errors[fieldToCheck]);

export const isFieldRequired = ({ schema, fieldToCheck }: { schema: FormSchema; fieldToCheck: string }) =>
  schema?.fields?.[fieldToCheck]?.validation?.[DEFAULT_RULES_NAMES.required];

export const isFieldNotDirtyAndEmpty = ({
  fieldToCheck,
  dirtyFields,
  defaultValues,
}: {
  fieldToCheck: string;
  dirtyFields: DirtyFields;
  defaultValues?: DefaultValues<FieldValues>;
}) => !dirtyFields?.[fieldToCheck] && !defaultValues?.[fieldToCheck];

export const isSessionInError = ({
  fieldsToCheckBySession,
  schema,
  dirtyFields,
  defaultValues,
  errors,
}: {
  schema: FormSchema;
  errors: FieldErrors;
  fieldsToCheckBySession: string[] | readonly [];
  dirtyFields: DirtyFields;
  defaultValues?: DefaultValues<FieldValues>;
}) =>
  fieldsToCheckBySession.some(
    (fieldToCheck) =>
      isFieldInError({ fieldToCheck, errors }) ||
      (isFieldRequired({ schema, fieldToCheck }) &&
        isFieldNotDirtyAndEmpty({ fieldToCheck, dirtyFields, defaultValues })),
  );