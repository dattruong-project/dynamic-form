
import { FormSchema } from "../form-builder/types";

export const INIT_FORM = 'INIT_FORM';
export const NEXT_SESSION = 'NEXT_SESSION';
export const RESET_FORM = 'RESET_FORM';
export const SET_SESSION = 'SET_SESSION';
export const PREVIOUS_SESSION = 'PREVIOUS_SESSION';
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';
export const NOTIFY_ERROR = 'NOTIFY_ERROR';

//Life Cycle type

export enum LifeCycleType {
  INIT = "init",
  MOUNT = "mount",
  UPDATE = "update",
  UNMOUNT = "unmount"
}

export const initForm = (formId: string, schema: FormSchema) => ({
  type: INIT_FORM,
  formId,
  schema,
});

export const setNextSession = (formId: string) => ({ type: NEXT_SESSION, formId });

export const updateFormData = <T>(formId: string, data: T) => ({
  type: UPDATE_FORM_DATA,
  formId,
  data,
});

export const notifyError = <T>(formId: string, error: T) => ({
  type: NOTIFY_ERROR,
  formId,
  error,
});

export const resetForm = (formId: string) => ({ type: RESET_FORM, formId });

export const setSession = (formId: string, sessionIndex: number) => ({
  type: SET_SESSION,
  formId,
  sessionIndex,
});

export const setPreviousSession = (formId: string) => ({
  type: PREVIOUS_SESSION,
  formId,
});