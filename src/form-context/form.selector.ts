import { FieldValues } from "../form-controller";
import { DefaultFormState } from "./form.reducer";

const defaultData = {} as FieldValues;

export const getFormData = (formId: string) => (state: DefaultFormState) => state?.[formId]?.data || defaultData;

export const getCurrentSessionIndex = (formId: string) => (state: DefaultFormState) =>
  state?.[formId]?.currentSessionIndex || 0;

export const isLastStep = (formId: string) => (state: DefaultFormState) => {
  const value = state?.[formId]?.isLastSession;
  if (typeof value === 'boolean') {
    return value;
  }

  return true;
};