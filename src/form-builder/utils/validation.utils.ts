import { FieldPath, FieldValues, UseFormWatch } from '../../form-controller';
import { DEFAULT_RULES_NAMES } from '../constants';
import { ExtraValidation, Validations } from '../types';

const EMPTY_OBJECT = {} as const;

export const handleValidateErrorMessage = (
  validate: (input: any, watch?: UseFormWatch<FieldValues>) => boolean | string | undefined | Promise<boolean | string | undefined>,
  message: string,
  watch?: UseFormWatch<FieldValues>
) => async (input: any): Promise<string | boolean | undefined> => {
  const result = await validate(input, watch);
  return result || message;
};

export interface GetFieldRulesArgs {
  validation?: Validations;
  extraValidation?: ExtraValidation;
  watch?: UseFormWatch<FieldValues>
}

export interface FieldRules<TFieldValues extends FieldValues = FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    validate?: { [key: string]: (meta?: any) => Promise<boolean> | boolean };
}
  
export const getFieldRules = ({
  validation = EMPTY_OBJECT,
  extraValidation = EMPTY_OBJECT,
  watch = undefined
}: GetFieldRulesArgs): FieldRules => {
  const hookFormRules = Object.values(validation).reduce(
    (acc, { key, ...rest }) => (DEFAULT_RULES_NAMES?.[key] ? { ...acc, [key]: rest } : acc),
    EMPTY_OBJECT,
  );
  const extraRules = Object.values(validation).reduce(
    (acc, { key, meta, message }) => 
      DEFAULT_RULES_NAMES?.[key] || (extraValidation && !extraValidation[key])
        ? acc
        : {
            ...acc,
            [key]: handleValidateErrorMessage(extraValidation?.[key]?.(meta), message, watch),
          },
    EMPTY_OBJECT,
  );
  const hasExtraRules = !!Object.keys(extraRules).length;

  return {
    ...hookFormRules,
    ...(hasExtraRules && { validate: extraRules, watch: watch })
  };
};