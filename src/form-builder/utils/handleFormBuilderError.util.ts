import { FormBuilderError } from './formBuilderError.utils';
import { SUBMIT_FIELD_TYPE } from '../constants';
import {  FormSchema } from '../types';

const EMPTY_OBJECT = {} as const;
const EMPTY_ARRAY = [] as const;

export const handleFormBuilderError = (typesAllowed: string[], schema: FormSchema, dictionary: any) => {
  const fieldValues = Object.values(schema?.fields || EMPTY_OBJECT);
  const invalidTypesInSchema = fieldValues.filter(
    ({ type }) => !typesAllowed.includes(type) || type === SUBMIT_FIELD_TYPE,
  );
  
  if (invalidTypesInSchema.length > 0) {
    throw new FormBuilderError(
      `The form's schema contains some bad field(s) type that are prohibited or not defined in the dictionary: \n${JSON.stringify(
        invalidTypesInSchema,
        null,
        2,
      )}\nAvailable in dictionary:\n${JSON.stringify(typesAllowed)}`,
    );
  }

  const sessions = schema?.sessions || EMPTY_OBJECT;
  const isSessionsNonNullObject = sessions && typeof sessions === 'object';

  if (!isSessionsNonNullObject || Object.keys(sessions).length === 0) {
    throw new FormBuilderError(
      `The form's schema must contain a map of steps by id. Found: \n${JSON.stringify(sessions, null, 2)}`,
    );
  }

  const sessionsById = schema?.sessionsById || EMPTY_ARRAY;

  if (Object.keys(sessions).length !== sessionsById.length) {
    throw new FormBuilderError(
      `The form's schema must contain as many sessions entries as session ids. Found: \n${JSON.stringify(
        { sessions: Object.keys(sessions).length, sessionsById: sessionsById.length },
        null,
        2,
      )}`,
    );
  }

  if (!dictionary.submit) {
    throw new FormBuilderError(
      `The form's dictionary must contain a submit field. Found: \n${JSON.stringify(dictionary, null, 2)}`,
    );
  }
};