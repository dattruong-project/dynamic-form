import { useEffect } from 'react';
import { FormSchema } from '../types';
import { FieldValues, UseFormSetFocus } from '../../form-controller';

export interface UseAutoFocusArgs {
  currentSessionIndex: number;
  schema: FormSchema;
  setFocus: UseFormSetFocus<FieldValues>;
}

export const useAutoFocus = ({ currentSessionIndex, schema, setFocus }: UseAutoFocusArgs) => {
  useEffect(() => {
    const currentSessionId = schema?.sessionsById?.[currentSessionIndex];
    const firstFieldIdInSession = schema?.sessions?.[currentSessionId]?.fieldsById?.[0];
    try {
      setFocus(firstFieldIdInSession);
    } catch (error) {
      return;
    }
  }, [currentSessionIndex, schema, setFocus]);
};